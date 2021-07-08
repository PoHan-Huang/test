import styled from 'styled-components';

export const Flex = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
export const Wrapper = styled.main`
display: flex;
justify-content: flex-start;
align-items: center;
flex-wrap: wrap;
flex-direction: column;
min-width: 100vw;
min-height: 100vh;
&.justify-content-center {
    justify-content: center;
}
    .table {
        width: 640px;
        margin-top: 32px;
        @media (max-width: 767px) {
            width: 480px;
            padding: 20px;
            margin-top: 20px;
        }
        .ant-table {
            box-shadow:
                rgba(0, 0, 0, 0.12) 0px 3px 6px -4px,
                rgba(0, 0, 0, 0.08) 0px 6px 16px 0px,
                rgba(0, 0, 0, 0.05) 0px 9px 28px 8px;
        }
        .ant-pagination {
            margin-top: 40px;
        }
        .select {
            justify-content: flex-end;
            margin: 32px 0 16px 0 ;
            .ant-select {
                margin-left: 8px;
                flex: 0 0 15%;
            }
        }
    }
`
