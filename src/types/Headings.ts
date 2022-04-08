export interface IHeadingData {
  text: string;
  Icon: any;
}

export interface IHeadingAction {
  title: string;
  Icon: any;
  collapsible: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
}
