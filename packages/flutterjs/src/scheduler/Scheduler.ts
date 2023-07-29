class Scheduler {
  phase: SchedulerPhase;
  persistenceCallbacks: (() => void)[];
  constructor() {
    this.phase = SchedulerPhase.idle;
    this.persistenceCallbacks = [];
  }

  schedule() {
    if (this.phase == SchedulerPhase.processing) return;
    this.phase = SchedulerPhase.processing;
    this.performSchedule();
    this.phase = SchedulerPhase.idle;
  }

  private performSchedule() {
    this.persistenceCallbacks.forEach((callback) => {
      callback();
    });
  }

  addPersistenceCallbacks(callback: () => void) {
    this.persistenceCallbacks.push(() => callback());
  }
}

enum SchedulerPhase {
  idle,
  processing,
}

export default Scheduler;
