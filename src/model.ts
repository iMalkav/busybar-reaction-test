import { num, bounded, App, type Settings, type View } from "./lib.ts";

export class AppModel extends App {
  phase = "Ready";
  cueAt = 0;
  result = 0;
  best = Infinity;
  results: number[] = [];
  sequence = 0;
  constructor(s: Settings, saved: Settings, now: number) {
    super(s, saved, now);
    this.best = bounded(saved.best, 0, 60000, Infinity);
  }
  tick(now: number): void {
    this.now = now;
    if (this.phase === "Wait" && now >= this.cueAt) {
      this.phase = "GO";
      this.notify("pop");
    }
  }
  key(key: string, _delta: number, now: number): boolean {
    this.tick(now);
    if (key === "ok") {
      if (this.phase === "Wait") {
        this.phase = "Too soon";
        return false;
      }
      if (this.phase === "GO") {
        this.result = Math.max(0, now - this.cueAt);
        this.results.push(this.result);
        this.best = Math.min(this.best, this.result);
        this.phase = "Result";
        return false;
      }
      if (this.results.length >= num(this.settings, "attempts", 5)) {
        this.results = [];
      }
      this.sequence++;
      this.cueAt = now + 1500 + (((now % 997) + this.sequence * 137) % 2000);
      this.phase = "Wait";
    }
    if (key === "back" && this.phase !== "Ready") {
      this.phase = "Ready";
      this.results = [];
      return true;
    }
    return false;
  }
  save(): Settings {
    return { best: Number.isFinite(this.best) ? this.best : null };
  }
  view(_now: number): View {
    return {
      title: "Reaction",
      value:
        this.phase === "Result"
          ? this.result + " ms"
          : this.phase.toUpperCase(),
      rows: [
        "Attempt " + this.results.length + "/" + num(this.settings, "attempts"),
        Number.isFinite(this.best)
          ? "Best " + this.best + " ms"
          : "No best yet",
      ],
      color: this.phase === "GO" ? "#44FF88FF" : "#FFB347FF",
      hint: this.phase === "Wait" ? "Wait for GO" : "OK next / Back reset",
    };
  }
}
