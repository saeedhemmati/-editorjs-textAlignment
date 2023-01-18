import { IconAlignLeft } from '@codexteam/icons';

import Align from './align';
import AlignCenterTool from './alignCenterTool';
import AlignRightTool from './alignRightTool';

class AlignLeftTool extends Align {
  button

  tag;

  iconClasses;

  constructor({ api }) {
    super(api);
    this.button = null;
    this.tag = 'DIV';

    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive,
    };
  }

  static get CSS() {
    return 'text-left';
  }

  get alignLeftIcon() {
    return IconAlignLeft;
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = this.alignLeftIcon;
    this.button.classList.add(this.iconClasses.base);

    return this.button;
  }

  surround(range) {
    if (!range) {
      return;
    }
    const termWrapper = this.api.selection.findParentTag(this.tag, AlignLeftTool.CSS);
    const centerAlignWrapper = this.api.selection.findParentTag(
      this.tag,
      AlignCenterTool.CSS,
    );
    const rightAlignWrapper = this.api.selection.findParentTag(
      this.tag,
      AlignRightTool.CSS,
    );
    if (centerAlignWrapper) {
      this.unwrapOthers(centerAlignWrapper);
    }
    if (rightAlignWrapper) {
      this.unwrapOthers(rightAlignWrapper);
    }
    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  wrap(range) {
    const div = document.createElement(this.tag);
    div?.classList.add(AlignLeftTool.CSS);
    div.appendChild(range.extractContents());
    range.insertNode(div);
    this.api.selection.expandToTag(div);
  }

  checkState() {
    const termTag = this.api.selection.findParentTag(this.tag, AlignLeftTool.CSS);
    this.button?.classList.toggle(this.iconClasses.active, !!termTag);
  }

  static get sanitize() {
    return {
      div: {
        class: AlignLeftTool.CSS,
      },
    };
  }
}

export default AlignLeftTool;
