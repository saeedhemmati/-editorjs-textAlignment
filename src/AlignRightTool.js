import { IconAlignRight } from '@codexteam/icons';

import Align from './align';
import AlignCenterTool from './alignCenterTool';
import AlignLeftTool from './alignLeftTool';

class AlignRightTool extends Align {

  button;

  tag;

  iconClasses;

  constructor({ api }) {
    super(api);
    this.api = api;
    this.button = null;
    this.tag = 'DIV';

    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive,
    };
  }

  static get CSS() {
    return 'text-right';
  }

  get alignRightIcon() {
    return IconAlignRight;
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = this.alignRightIcon;
    this.button.classList.add(this.iconClasses.base);

    return this.button;
  }

  surround(range) {
    if (!range) {
      return;
    }
    const termWrapper = this.api.selection.findParentTag(this.tag, AlignRightTool.CSS);
    const centerAlignWrapper = this.api.selection.findParentTag(
      this.tag,
      AlignCenterTool.CSS,
    );
    const leftAlignWrapper = this.api.selection.findParentTag(
      this.tag,
      AlignLeftTool.CSS,
    );
    if (centerAlignWrapper) {
      this.unwrapOthers(centerAlignWrapper);
    }
    if (leftAlignWrapper) {
      this.unwrapOthers(leftAlignWrapper);
    }
    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  wrap(range) {
    console.log({ content: range.innerHtml });
    const div = document.createElement(this.tag);
    div?.classList.add(AlignRightTool.CSS);
    div.appendChild(range.extractContents());
    range.insertNode(div);
    this.api.selection.expandToTag(div);
  }

  checkState() {
    const termTag = this.api.selection.findParentTag(this.tag, AlignRightTool.CSS);
    this.button?.classList.toggle(this.iconClasses.active, !!termTag);
  }

  static get sanitize() {
    return {
      div: {
        class: AlignRightTool.CSS,
      },
    };
  }
}

export default AlignRightTool;
