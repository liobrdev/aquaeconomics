import { INavigationState } from '@/types';


export const initialNavigationState: INavigationState = {
  navigationOn: false,
  servicesOn: false,
  companyOn: false,
};

export const navigationReducer = (
  state: INavigationState = initialNavigationState, 
  action: any,
): INavigationState => {
  switch (action.type) {
    case 'NAVIGATION_SHOW':
      return {
        ...state,
        navigationOn: true,
        servicesOn: false,
        companyOn: false,
      };

    case 'NAVIGATION_CLOSE':
      return {
        ...state,
        navigationOn: false,
        servicesOn: false,
        companyOn: false,
      };

    case 'SERVICES_SHOW':
      return {
        ...state,
        servicesOn: true,
        companyOn: false,
      };

    case 'SERVICES_CLOSE':
      return {
        ...state,
        servicesOn: false,
      };

    case 'COMPANY_SHOW':
      return {
        ...state,
        servicesOn: false,
        companyOn: true,
      };

    case 'COMPANY_CLOSE':
      return {
        ...state,
        companyOn: false,
    };

    case 'NAVIGATION_RESET':
      return initialNavigationState;

    default:
      return state;
  }
};