import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const CTableHeader = ({ children }: Props) => {
  return <HeaderWrapper>{children}</HeaderWrapper>;
};

export default CTableHeader;

const HeaderWrapper = styled.div`
  z-index: 2;
  width: 100%;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 24px;
`;
