import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const years = Array.from(new Array(15), (x, i) => `${i + 2006}`);

const Filters = () => {
  const router = useRouter();
  const { launch_year, launch_success, land_success } = router.query;
  const [yearFilter, setYearFilter] = useState(launch_year);
  const [launchSuccess, setLaunchSuccess] = useState(launch_success);
  const [landingSuccess, setLandingSuccess] = useState(land_success);
  const applyFilter = () => {
    const query = {};
    if (yearFilter?.length) {
      query.launch_year = yearFilter;
    }
    if (launchSuccess?.length) {
      query.launch_success = launchSuccess;
    }
    if (landingSuccess?.length) {
      query.land_success = landingSuccess;
    }
    router.push({
      pathname: router.pathname,
      query
    });
  };

  const toggleFilterVisibility = () => {
    const el = document?.getElementsByClassName('filter-group-wrapper')[0];
    el.classList.toggle('hidden');
    el.classList.toggle('visible');
  };

  useEffect(() => {
    applyFilter();
  }, [JSON.stringify(yearFilter), launchSuccess, landingSuccess]);
  return (
    <FilterContainer>
      <div className="filter-title">Filters</div>
      <div
        className="toggle-filter"
        onClick={() => {
          toggleFilterVisibility();
        }}
      >
        Click to show/hide filter
      </div>
      <div className="filter-group-wrapper hidden">
        <div className="filter-group">
          <div className="filter-title">Launch year</div>
          <div className="filters">
            {years.map(year => (
              <div key={year} className="filter-wrapper">
                <FilterToggle
                  value={year}
                  active={year === yearFilter}
                  onClick={() => {
                    setYearFilter(year === yearFilter ? '' : year);
                  }}
                />
              </div>
            ))}
            <div className="dead-container filter-wrapper" />
          </div>
        </div>
        <div className="filter-group">
          <div className="filter-title">Launch Success</div>
          <div className="filters">
            <div className="filter-wrapper">
              <FilterToggle
                value="true"
                active={launchSuccess === 'true'}
                onClick={() =>
                  setLaunchSuccess(launchSuccess === 'true' ? '' : 'true')
                }
              />
            </div>
            <div className="filter-wrapper">
              <FilterToggle
                value="false"
                active={launchSuccess === 'false'}
                onClick={() =>
                  setLaunchSuccess(launchSuccess === 'false' ? '' : 'false')
                }
              />
            </div>
          </div>
        </div>
        <div className="filter-group">
          <div className="filter-title">Landing Success</div>
          <div className="filters">
            <div className="filter-wrapper">
              <FilterToggle
                value="true"
                active={landingSuccess === 'true'}
                onClick={() =>
                  setLandingSuccess(landingSuccess === 'true' ? '' : 'true')
                }
              />
            </div>
            <div className="filter-wrapper">
              <FilterToggle
                value="false"
                active={landingSuccess === 'false'}
                onClick={() =>
                  setLandingSuccess(landingSuccess === 'false' ? '' : 'false')
                }
              />
            </div>
          </div>
        </div>
      </div>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  padding: 10px;
  max-width: 400px;
  margin: 0 auto;
  .filter-title {
    font-weight: 600;
    text-align: center;
  }
  .toggle-filter {
    text-align: center;
  }
  .filter-group-wrapper {
    transition: height 1s;
    overflow: hidden;
    &.hidden {
      height: 0;
    }
    &.visible {
      height: 600px;
    }
  }
  .filter-group {
    .filters {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .filter-wrapper {
        width: 35%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
      }
    }
  }
  @media (min-width: 700px) {
    .toggle-filter {
      display: none;
    }
    .filter-group-wrapper.hidden,
    .filter-group-wrapper.visible {
      height: 600px;
    }
  }
`;

const FilterButton = styled.span`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${props => (props.active ? '#a3ba70' : '#e8f5cb')};
  cursor: pointer;
`;

const FilterToggle = ({ onClick, value, active }) => (
  <FilterButton onClick={onClick} active={active}>
    {value}
  </FilterButton>
);
export default Filters;
