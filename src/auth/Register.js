import React from "react";
import styled from "styled-components";
import { Form, Input, Button, Layout, message, PageHeader } from "antd";
import { Link } from "@reach/router";
import { useNavigate } from "@reach/router";
import { useFirebase } from "../firebase/useFirebase";
import { FacebookOutlined } from "@ant-design/icons";
import { GoogleOutlined } from "@ant-design/icons";

const MainLayout = styled(Layout)`
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

const TextLayout = styled.div``;

function Register() {
    const { register, googleAuth, facebookAuth } = useFirebase();
    const navigate = useNavigate();

    const handleGoogle = async () => {
        try {
            await googleAuth();
            message.success("Successfully Sign Up with Google Account");
            navigate("/");
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleFacebook = async () => {
        try {
            await facebookAuth();
            message.success("Successfully Sign Up with Facebook Account");
            navigate("/");
        } catch (error) {
            message.error(error.message);
        }
    };

    const onFormFinish = async values => {
        console.log("values are", values);
        try {
            await register(values.email, values.password);
            message.success("Successfully registered");
            navigate("/");
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <MainLayout>
            <PageHeader title="Sign Up" />

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

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!"
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
            <Button type="primary" danger style={{ width: 300 }} onClick={handleGoogle} icon={<GoogleOutlined />} size="large">
                Sign Up With Google Account
            </Button>

            <div style={{ margin: 5 }}></div>

            <Button type="primary" style={{ width: 300 }} onClick={handleFacebook} icon={<FacebookOutlined />} size="large">
                Sign Up With Facebook Account
            </Button>

            <TextLayout>
                Already have login? go <Link to="/login">here</Link>
            </TextLayout>
        </MainLayout>
    );
}

export default Register;
