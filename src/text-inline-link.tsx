import { cn } from './lib';
import React, { useMemo } from 'react';


type ParagraphProps = React.DetailedHTMLProps<
  React.ParamHTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
  >;

type AnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
  >;

type TextInlineLinkProps = ParagraphProps & {
  linkClassName?: string;
  target?: AnchorProps['target']
};

const buildInnerHtml = (
  input: string,
  linkTarget: AnchorProps['target'],
  linkClassName?: string
) => {
  // Matches the pattern [<label>](<link>)
  const regex = /\[([^\]]+)\]\(([^)]+)\)/;
  let transformedString = input;

  while (true) {
    const data = regex.exec(transformedString);
    if (!data) break;

    const length = data.at(0)?.length ?? data.length;
    const label = data.at(1);
    const link = data.at(2);

    if (label && link) {
      transformedString =
        transformedString.slice(0, data.index - 1) +
        `<span class="mx-1">
          <a href=${link} target="${linkTarget ?? '_self'}">
            <span class="${cn('underline', linkClassName)}">${label}</span>
          </a>
        </span>` +
        transformedString.slice(data.index + length);
    }
  }

  return transformedString;
};

const TextInlineLink = ({
  children,
  linkClassName,
  target = '_blank',
  ...props
}: TextInlineLinkProps) => {
  const innerHtml = useMemo(
    () => buildInnerHtml(children?.toString() ?? '', target, linkClassName),
    [children, linkClassName, target]
  );

  return (
    <p
      {...props}
      dangerouslySetInnerHTML={{
        __html: innerHtml,
      }}
    />
  );
};

export { TextInlineLink, type TextInlineLinkProps };

