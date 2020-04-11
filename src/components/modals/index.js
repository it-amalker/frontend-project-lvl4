import Create from './Create';
import Remove from './Remove';
import Rename from './Rename';

const modals = {
  creating: Create,
  removing: Remove,
  renaming: Rename,
};

export default (modalName) => modals[modalName];
