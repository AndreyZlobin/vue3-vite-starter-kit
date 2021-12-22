export default {
  data() {
    return {
      currentTask: null,
      showPopover: false,
      popoverCoords: {
        X: null,
        Y: null,
        bottom: null,
      },
    };
  },
  computed: {
    popoverStyles() {
      const { X, Y } = this.popoverCoords;
      return {
        top: `${Y}px`,
        left: `${X}px`,
        transform: `translateY(-100%)`,
        color:
          this.currentTask?.dates && this.checkStartOrFinish
            ? this.checkStartOrFinish(this.currentTask)
            : '',
      };
    },
    getCurrenTask() {
      return this.currentTask || {};
    },
  },
  methods: {
    mouseoverHandlder(task) {
      this.showPopover = true;
      this.currentTask = task;
    },
    mouseoutHandlder() {
      this.showPopover = false;
      this.currentTask = {};
    },
    mouseMoveHandler(event) {
      const { x, y } = event;
      const { bottom } = event.target.getBoundingClientRect();
      this.popoverCoords.X = x + 20;
      this.popoverCoords.bottom = bottom;
      this.popoverCoords.Y = y + 20;
    },
  },
};
