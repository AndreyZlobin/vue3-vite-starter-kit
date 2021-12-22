import { createWrapper } from "~/tests/__helpers__/createComponent";
import Notification from "~/components/shared/notifications/notification.vue";

const MOCK_NOTY_PROP = {
  body: "mock",
  id: 1,
  title: "mock",
};

describe("notification test", () => {
  let wrapper: any;

  afterEach(() => {
    wrapper.destroy();
  });

  const createComponent = (propsData = { notification: MOCK_NOTY_PROP }) =>
    (wrapper = createWrapper(Notification, {
      propsData,
    }));

  it("notification component rendering", () => {
    createComponent();
    expect(wrapper.find(Notification).exist).toBe(true);
  });
});
