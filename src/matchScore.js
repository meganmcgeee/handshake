import compose from 'lodash/fp/compose';
import intersection from 'lodash/fp/intersection';
import lowerCase from 'lodash/fp/lowerCase';
import replace from 'lodash/fp/replace';

const normalize = compose(replace(/\s+/g, ''), lowerCase);
export default function matchScore(interests1, interests2) {
  return intersection(
    interests1.map(normalize),
    interests2.map(normalize)
  ).length;
}
