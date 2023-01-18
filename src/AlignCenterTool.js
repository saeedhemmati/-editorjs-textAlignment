import { IconAlignCenter } from '@codexteam/icons';
import Align from './align';
import AlignLeftTool from './alignLeftTool';
import AlignRightTool from './alignRightTool';

import './index.css';

class AlignCenterTool extends Align {
  button;

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
    return 'text-center';
  }

  get alignLeftIcon() {
    return IconAlignCenter;
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
    const termWrapper = this.api.selection.findParentTag(this.tag, AlignCenterTool.CSS);

    const rightAlignWrapper = this.api.selection.findParentTag(
      this.tag,
      AlignRightTool.CSS,
    );
    const leftAlignWrapper = this.api.selection.findParentTag(
      this.tag,
      AlignLeftTool.CSS,
    );
    if (rightAlignWrapper) {
      this.unwrapOthers(rightAlignWrapper);
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
    const div = document.createElement(this.tag);
    div?.classList.add(AlignCenterTool.CSS);
    div.appendChild(range.extractContents());
    range.insertNode(div);
    this.api.selection.expandToTag(div);
  }

  checkState() {
    const termTag = this.api.selection.findParentTag(this.tag, AlignCenterTool.CSS);
    this.button?.classList.toggle(this.iconClasses.active, !!termTag);
  }

  static get sanitize() {
    return {
      div: {
        class: AlignCenterTool.CSS,
      },
    };
  }
}

export default AlignCenterTool;
