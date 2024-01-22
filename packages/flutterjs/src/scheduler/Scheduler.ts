class Scheduler {
  phase: SchedulerPhase;
  private persistenceCallbacks: (() => void)[];
  private postFrameCallbacks: (() => void)[];
  constructor() {
    this.phase = SchedulerPhase.idle;
    this.persistenceCallbacks = [];
    this.postFrameCallbacks = [];
  }

  schedule() {
    switch (this.phase) {
      case SchedulerPhase.idle:
      case SchedulerPhase.postFrameCallbacks:
        this.performSchedule();
        break;
      case SchedulerPhase.persistenceCallbacks:
        break;
    }
  }

  private performSchedule() {
    this.phase = SchedulerPhase.persistenceCallbacks;
    this.persistenceCallbacks.forEach((callback) => {
      callback();
    });
    this.phase = SchedulerPhase.postFrameCallbacks;
    this.resolvePostCallbacks()
    this.phase = SchedulerPhase.idle;
  }

  addPersistenceCallbacks(callback: () => void) {
    this.persistenceCallbacks.push(() => callback());
  }

  addPostFrameCallbacks(callback: () => void) {
    this.postFrameCallbacks.push(() => callback());
  }

  resolvePostCallbacks() {
    this.postFrameCallbacks.forEach((callback) => {
      callback();
    });
    this.postFrameCallbacks = [];
  }
}

enum SchedulerPhase {
  idle,
  persistenceCallbacks,
  postFrameCallbacks,
}

export default Scheduler;
