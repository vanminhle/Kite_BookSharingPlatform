import Wrapper from '../../assets/wrappers/ChartContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountYearlyStats } from '../../features/statistics/statisticsSlice';
import AccountsBarChart from './AccountsBarChart';
import { useEffect } from 'react';

const AccountsChartContainer = () => {
  const { accountCreatedYearly } = useSelector((store) => store.statistics);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountYearlyStats());
  }, []);

  return (
    <Wrapper>
      <h5 className="page-title">Yearly Accounts Registered</h5>
      <AccountsBarChart data={accountCreatedYearly?.totalAccountsEachYear} />
    </Wrapper>
  );
};

export default AccountsChartContainer;
