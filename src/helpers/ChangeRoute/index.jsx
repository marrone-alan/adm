import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// variables
import { screenSize } from '../../styles/variables';
// action
import { hideMenu } from '../../actions/menu';

const ChangeRoute = ({ children, location: { pathname }, hideMenu }) => {
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // hide menu
  if (window.innerWidth <= screenSize.mdInt) {
    hideMenu();
  }
  return children || null;
};

export default withRouter(connect(null, { hideMenu })(ChangeRoute));
