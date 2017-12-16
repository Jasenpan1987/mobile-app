import styled from 'styled-components';

function getImageUrl(props) {
  return `${window.API_BASE}/images/${props.src}`;
}

export const BackgroundImage = styled.div`
  background-image: url(${props => getImageUrl(props)});
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
`;
