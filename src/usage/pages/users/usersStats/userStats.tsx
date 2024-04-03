import { RiseOutlined } from '@ant-design/icons';
import {Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import {IUsers} from "../types/users.interfaces";
interface PostsStatsProps {
    users: IUsers | undefined,
    isLoading: boolean
}
const UserStats = ({users, isLoading}: PostsStatsProps) => {
    return (
        <Row gutter={0} style={{margin: "50px 0"}}>
            <Col span={400}>
                <Card style={{width: "400px"}} bordered>
                    <Statistic
                        loading={isLoading}
                        title="Количество пользователей"
                        value={users?.length}
                        prefix={<RiseOutlined/>}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default UserStats;