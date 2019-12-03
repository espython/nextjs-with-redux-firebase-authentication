import styled from 'styled-components';

import { FiShoppingCart } from 'react-icons/fi';

export const CartContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ShoppingIcon = styled(FiShoppingCart)`
  width: 24px;
  height: 24px;
`;

export const ItemCountContainer = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;
