import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import CongestionDashboard from '../../components/DashBoards/CongestionDashboard';

const UserDashboard = (props) => {
  const { users } = props;
  const userCount = users.length;
  let count = 0;
  const takeCount = (name) => {
    if (users) {
      count = users.filter((item) => item.role === name).length;
      return count;
    }
  };
  let dashData = [
    {
      id: 'Team Leads',
      value: takeCount('team_leader'),
      color: 'hsl(274, 70%, 50%)',
    },
    {
      id: 'Junior',
      value: takeCount('junior_developer'),
      color: 'hsl(258, 70%, 50%)',
    },
    {
      id: 'Middle',
      value: takeCount('middle_developer'),
      color: 'hsl(83, 70%, 50%)',
    },
    {
      id: 'Senior',
      value: takeCount('senior_developer'),
      color: 'hsl(109, 70%, 50%)',
    },
    {
      id: 'Interns',
      value: takeCount('intern'),
      color: 'hsl(166, 70%, 50%)',
    },
    {
      id: 'Managers',
      value: takeCount('ceo') + takeCount('cto') + takeCount('sales_manager') + takeCount('office_manager') + takeCount('hr_manager'),
      color: 'hsl(319, 70%, 50%)',
    },
  ];
  dashData = dashData.filter((item) => item.value !== 0);
  console.log(dashData);
  return (
    <>
      <ResponsivePie
        data={dashData}
        margin={{
          top: 40, right: 0, bottom: 60, left: 100,
        }}
        colors={{ scheme: 'nivo' }}
        borderWidth={2}
        innerRadius={0.5}
        padAngle={1.5}
        radialLabel={(d) => `${d.id} (${d.value})`}
        cornerRadius={4}
        borderColor={{ from: 'color', modifiers: [['darker', 2]] }}
        sliceLabel={(d) => `${(d.value / userCount) * 100}%`}
        radialLabelsSkipAngle={1}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="black"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={30}
        radialLabelsLinkHorizontalLength={30}
        radialLabelsLinkStrokeWidth={5}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={1}
        slicesLabelsTextColor="#333333"
        isInteractive={false}
        fontSize={140}
        motionStiffness={90}
        motionDamping={15}
        theme={{
          labels: {
            text: {
              fontSize: 24,
            },
          },
          legends: {
            text: {
              fontSize: 16,
            },
          },
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'Team Leads',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'Middle',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'Junior',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'Senior',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'Interns',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'Junior',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'Managers',
            },
            id: 'lines',
          },
        ]}
      />
    </>
  );
};

export default UserDashboard;