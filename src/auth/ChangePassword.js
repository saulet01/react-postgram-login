import React, { Component } from "react";
import { Collapse } from "antd";
import { Form, Input, Button, Layout, message, PageHeader } from "antd";
import { useNavigate } from "@reach/router";
import { useFirebase } from "../firebase/useFirebase";
import { KeyOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

function ChangePassword() {
    const { changePassword } = useFirebase();
    // const navigate = useNavigate();

    const onFormFinish = async values => {
        try {
            await changePassword(values.newPassword);
            message.success("Your password has been updated succesfully!");
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <Collapse bordered expandIcon={() => <KeyOutlined />}>
            <Panel header="Change/Update Password" key="1">
                <PageHeader title="Change Password" />
                <Form onFinish={onFormFinish}>
                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                            { required: true, message: "Please input your username!" },
                            { min: 5, message: "Username must be minimum 5 characters" }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Change Password
                        </Button>
                    </Form.Item>
                </Form>
            </Panel>
        </Collapse>
    );
}

export default ChangePassword;
