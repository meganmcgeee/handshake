import compose from 'lodash/fp/compose';
import map from 'lodash/fp/map';
import split from 'lodash/fp/split';
import trim from 'lodash/fp/trim';

export default compose(map(trim), split(','));
