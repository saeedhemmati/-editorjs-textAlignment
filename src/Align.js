export default class Align {
  api;

  constructor(api) {
    this.api = api;
  }

  static get isInline() {
    return true;
  }

   unwrapOthers(term) {
    const sel = window.getSelection();
    const range = sel?.getRangeAt(0);
    const unwrappedContent = range?.extractContents();
    const parent = term.parentNode;
    parent.removeChild(term);
    range?.insertNode();
    sel?.removeAllRanges();
    sel?.addRange();
  }

   unwrap(termWrapper) {
    this.api.selection.expandToTag(termWrapper);
    const sel = window.getSelection();
    const range = sel?.getRangeAt(0);

    const unwrappedContent = range?.extractContents();

    termWrapper.parentNode.removeChild(termWrapper);

    range?.insertNode(unwrappedContent);

    sel?.removeAllRanges();
    sel?.addRange(range);
  }
}
