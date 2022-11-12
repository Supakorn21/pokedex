import { Button } from 'antd';
import { Dropdown as DropdownAntd, Space } from 'antd';
import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';

const StyledSpace = styled(Space)`
  display: flex;
  justify-content: space-between;
`;

const Dropdown = ({ title, menu }) => {
  // console.log(menu);
  return (
    <DropdownAntd overlay={menu}>
      <Button width="100%">
        <StyledSpace>
          {title}
          <DownOutlined />
        </StyledSpace>
      </Button>
    </DropdownAntd>
  );
};

export default Dropdown;
