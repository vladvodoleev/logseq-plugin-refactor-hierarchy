import React from 'react';

type PageNameTextProps = {
  pageName: string;
  match: string;
  replace: string;
};

export default function PageNameText({ pageName, match, replace }: PageNameTextProps) {
  return (
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: pageName.replace(match, `<span class='text-primary-link'>${replace}</span>`),
      }}
    />
  );
}
