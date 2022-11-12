import { Text, DropdownMenu } from '@atomic';
import { useState } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  .dropdown-wrapper {
    margin-top: 1rem;
    min-width: 20rem;

    .ant-btn {
      font-size: 1rem;
      height: 3rem;
      min-width: 20rem;
    }
  }
`;

const FilterDropdown = ({ label, items = [] }) => {
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const onItemSelect = ({ item }) => {
    setSelectedItem(item);
  };
  return (
    <StyledDiv>
      <Text>{label}</Text>
      <div className="dropdown-wrapper">
        <DropdownMenu
          value={selectedItem}
          items={items}
          onItemSelect={onItemSelect}
        />
      </div>
    </StyledDiv>
  );
};

export default FilterDropdown;
