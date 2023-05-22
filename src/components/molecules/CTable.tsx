import { Table } from "antd";
import styled from "styled-components";
import type { ColumnsType } from "antd/es/table";
import { COLORS } from "@constants/colors";
import React from "react";

type Props = {
  columns: ColumnsType<any>;
  dataSource: any[];
  pagination?: object | false;
  size?: "large" | "middle" | "small";
};

const CTable = ({ columns, dataSource, pagination, size }: Props) => {
  return (
    <TableWrapper>
      <TableContainer
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        size={size}
      />
    </TableWrapper>
  );
};

export default CTable;

const TableWrapper = styled.div`
  overflow: auto;
  padding: 24px;
  height: 85vh;
`;
const TableContainer = styled(Table)`
  min-width: 100px;
  .ant-table-thead .ant-table-cell {
    background-color: ${COLORS.RezztoranPrimary};
    color: ${COLORS.TableHeaderTextColor};
  }
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    width: 0px;
  }
`;
