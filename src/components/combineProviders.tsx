import React, { FunctionComponent } from 'react';

type Props = {
  children: React.ReactNode;
};

export const combineProviders = (providers: FunctionComponent<Props>[]) =>
  // eslint-disable-next-line react/function-component-definition, react/display-name
  providers.reduce((Combined, Provider) => ({ children }: Props) => (
    <Combined>
      <Provider>{children}</Provider>
    </Combined>
  ));
