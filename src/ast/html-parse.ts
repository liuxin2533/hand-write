const startPattern = /^<(\w+)(([^>]+>)|>)/;
const endPattern = /^<\/(\w+)>/;
const textPattern = /^>(.+)(<\/\w+>)/;


type Element = {
  tag?: string;
  text?: string;
  attrs?: Record<string, string>;
  children: Element[];
};

export function parse(templateStr: string) {
  let index = 0;
  const tagStack: string[] = [];
  const elStack: Element[] = [{ children: [] }];

  let rest = templateStr;

  while (index < templateStr.length - 1) {
    rest = templateStr.substring(index);
    if (startPattern.test(rest)) {
      const matched = rest.match(startPattern);
      const tag = matched?.at(1);
      const length = matched?.at(2)?.length || 0;
      if (tag && length) {
        tagStack.push(tag);
        elStack.push({ tag, children: [] });
        index += tag.length + length;
      }
    } else if (endPattern.test(rest)) {
      const tag = rest.match(endPattern)?.at(1);
      const stackTag = tagStack.pop();
      if (tag && tag === stackTag) {
        const el = elStack.pop();
        if (el) {
          elStack[elStack.length - 1].children.push(el);
        }
        index += tag.length + 3;
      } else {
        throw new Error(`标签${stackTag}未闭合`);
      }
    } else if (textPattern.test(rest)) {
      const matched = rest.match(textPattern);
      const text = matched?.at(1);
      const tag = matched?.at(2);
      if (text && tag) {
        elStack[elStack.length - 1].children.push({
          text,
          children: []
        });
        index += text.length + 1;
      }
    } else {
      index++;
    }
  }
  return elStack[0];
}
