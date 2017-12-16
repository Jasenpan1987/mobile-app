import { loginSaga } from '../../components/Login/sagas';
import { dashboardSaga } from '../../components/Dashboard';
import { projectListSaga } from '../../components/ProjectList';
import { loadLotListSaga } from '../../components/LotList';
import { loadLotDetailSaga } from '../../components/LotDetail';

const sagas = [
  ...loginSaga,
  ...projectListSaga,
  ...dashboardSaga,
  ...loadLotListSaga,
  ...loadLotDetailSaga
];

export default function* root() {
  yield sagas;
}
