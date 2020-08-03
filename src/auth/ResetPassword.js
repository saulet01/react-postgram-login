import React from "react";
import styled from "styled-components";
import { Form, Input, Button, Layout, PageHeader, message } from "antd";
import { useFirebase } from "../firebase/useFirebase";
import { Link } from "@reach/router";

const MainLayout = styled(Layout)`
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;
const TextLayout = styled.div``;

const ResetPassword = () => {
    const { resetPassword } = useFirebase();

    const onFormFinish = async values => {
        try {
            await resetPassword(values.email);
            message.success("Reset link has been sent to your email adress!");
            // navigate("/");
        } catch (error) {
            message.error(error.message);
        }
    };
    return (
        <MainLayout>
            <PageHeader title="Reset Password" />
            <Form onFinish={onFormFinish}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: "Please input your email!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Reset
                    </Button>
                </Form.Item>
            </Form>
            <Link to="/login">
                <Button>Go Back</Button>
            </Link>
        </MainLayout>
    );
};

export default ResetPassword;
