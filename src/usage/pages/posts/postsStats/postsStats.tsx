import { RiseOutlined } from '@ant-design/icons';
import {Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import {IPosts} from "../types/posts.interfaces";
interface PostsStatsProps {
    posts: IPosts | undefined,
    isLoading: boolean
}
const PostsStats = ({posts, isLoading}: PostsStatsProps) => {
    return (
        <Row gutter={0} style={{margin: "50px 0"}}>
            <Col span={400}>
                <Card style={{width: "400px"}} bordered>
                    <Statistic
                        loading={isLoading}
                        title="Количество постов"
                        value={posts?.length}
                        prefix={<RiseOutlined/>}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default PostsStats;