<template>
  <div :class="nodeClass">
    <div class="org-tree-node-label">
      <div
        :class="innerLabelClass"
        :style="{ width: labelWidthStyles, padding: nodeTreePadding }"
        @click="(e) => $emit('node-click', e, data, nodeContext)"
        @mouseout="(e) => $emit('node-mouseout', e, data, nodeContext)"
        @mouseover="(e) => $emit('node-mouseover', e, data, nodeContext)"
        @focus="(e) => $emit('node-focus', e, data, nodeContext)"
      >
        <slot name="node" :data="data" :context="nodeContext">
          <span v-if="!renderContent" :style="{ fontSize: nodeTreeFontSize }">{{
            data[props.label]
          }}</span>
          <span v-else>{{ renderContent(data) }}</span>
        </slot>
        <span
          v-if="collapsable && !isLeaf"
          :class="nodeExpandBtnClass"
          @click.stop="onExpandBtnClick"
        ></span>
      </div>
    </div>
    <div
      v-if="(collapsable && expanded && !isLeaf) || (!collapsable && !isLeaf)"
      class="org-tree-node-children"
    >
      <blocks-node
        v-for="ch in data[props.children]"
        :key="nodeKey(ch)"
        :data="ch"
        :props="props"
        :collapsable="collapsable"
        :render-content="renderContent"
        :label-width="labelWidth"
        :label-class-name="labelClassName"
        :padding-x="paddingX"
        :padding-y="paddingY"
        @node-expand="(e, data, context) => $emit('node-expand', e, data, context)"
        @node-focus="(e, data, context) => $emit('node-focus', e, data, context)"
        @node-click="(e, data, context) => $emit('node-click', e, data, context)"
        @node-mouseover="(e, data, context) => $emit('node-mouseover', e, data, context)"
        @node-mouseout="(e, data, context) => $emit('node-mouseout', e, data, context)"
      >
        <template #node="{ data, context }">
          <slot name="node" :data="data" :context="context"></slot>
        </template>
      </blocks-node>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { NodeContext } from "~/components/shared/blocks-tree/types";

export default defineComponent({
  name: "BlocksNode",
  props: {
    data: {
      type: Object,
      required: true,
    },
    props: {
      type: Object,
      default: () => ({
        label: "label",
        expand: "expand",
        children: "children",
        key: "id",
      }),
    },
    collapsable: {
      type: Boolean,
      default: false,
    },
    renderContent: Function,
    labelWidth: [String, Number],
    paddingX: [String, Number],
    paddingY: [String, Number],
    labelClassName: [String, Function],
  },
  setup(props, { emit }) {
    let isLeaf = computed(
      () =>
        !(
          Array.isArray(props.data[props.props.children]) &&
          props.data[props.props.children].length > 0
        ),
    );
    let labelWidthStyles = computed(() =>
      props.labelWidth
        ? typeof props.labelWidth == "number"
          ? `${props.labelWidth}px`
          : props.labelWidth
        : "auto",
    );
    let expanded = ref<boolean>(props.data[props.props.expand] || true);

    let nodeClass = computed(() => {
      return {
        "org-tree-node": true,
        "is-leaf": isLeaf.value,
        collapsed: !isLeaf.value && props.collapsable && !expanded.value,
      };
    });

    const nodeTreePadding = computed(() => `${props.paddingX || 20}px ${props.paddingY || 30}px`);
    const nodeTreeFontSize = computed(
      () => `${props.labelWidth && props.labelWidth <= 150 ? 12 : 16}px`,
    );

    let innerLabelClass = computed(() => {
      let labelClassName =
        typeof props.labelClassName == "function"
          ? props.labelClassName(props.data)
          : props.labelClassName;

      return {
        "org-tree-node-label-inner": true,
        [labelClassName]: !!labelClassName,
      };
    });
    let nodeExpandBtnClass = computed(() => {
      return {
        "org-tree-node-btn": true,
        expanded: !!expanded.value,
      };
    });
    const toggleExpand = () => {
      expanded.value = !expanded.value;
    };
    const onExpandBtnClick = (e: Event) => {
      toggleExpand();
      emit("node-expand", e, props.data, nodeContext);
    };
    const nodeContext: NodeContext = {
      isExpanded: () => expanded.value,
      toggleExpand,
    };

    const nodeKey = (child) => {
      let key = child[props.props.key];
      if (typeof key === "function") {
        return key(child);
      }
      return key;
    };
    return {
      nodeClass,
      innerLabelClass,
      isLeaf,
      nodeExpandBtnClass,
      onExpandBtnClick,
      nodeTreePadding,
      labelWidthStyles,
      nodeTreeFontSize,
      expanded,
      nodeContext,
      nodeKey,
    };
  },
});
</script>
