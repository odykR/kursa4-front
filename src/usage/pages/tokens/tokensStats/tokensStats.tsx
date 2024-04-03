import { RiseOutlined } from '@ant-design/icons';
import {Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import {ITokens} from "../types/tokens.interfaces";
interface PostsStatsProps {
    tokens: ITokens | undefined,
    isLoading: boolean
}
const TokensStats = ({tokens, isLoading}: PostsStatsProps) => {
    return (
        <Row gutter={0} style={{margin: "50px 0"}}>
            <Col span={400}>
                <Card style={{width: "400px"}} bordered>
                    <Statistic
                        loading={isLoading}
                        title="Количество активных токенов"
                        value={tokens?.length}
                        prefix={<RiseOutlined/>}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default TokensStats;