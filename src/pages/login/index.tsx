import { default as Form } from 'antd/es/form'
import 'antd/es/form/style/index.css'
import { default as Input } from 'antd/es/input'
import 'antd/es/input/style/index.css'
import { default as message } from 'antd/es/message'
import 'antd/es/message/style/index.css'
import api from 'constants/api'
import Cookies from 'js-cookie'
import { default as React } from 'react'
import { VButton } from 'vendor/pages'
import './style.scss'
interface User {
    username: string
    password: string
}
interface LoginType {
    data: { data: { username: string, expireIn: number } }
}
interface ErrorType {
    response: {
        status?: number
        data: {
            message: [{ field: string, message: string }]
        }
    }
}

export default function LoginPage() {
    const [form] = Form.useForm();

    const onFinish = (values: User) => {
        api.post('/auth/login', values)
            .then((res: LoginType) => {
                setCookie("username", values.username, 31536000000)
                window.location.href = '/points-history'
            })
            .catch((errors) => handleError(errors))
    };

    const handleError = (err: ErrorType) => {
        const mess = 'Login Failed'
        if (err.response) {
            switch (err.response.status) {
                case 400:
                    const errors = err.response.data.message
                    errors.map((item) => {
                        const setFields = [{ name: item.field }]
                        form.setFields(setFields)
                        message.error(item.message)
                    })
                    break;
                case 401:
                    message.error('Invalid username or password')
                    break;
                case 404:
                    message.error('Not Found')
                    break;
                case 500:
                    message.error(mess)
                    break;
                default:
                    message.error(mess)
                    break;
            }
        } else {
            message.error('Request Login Failed')
        }
    }

    const setCookie = (username: string, value: string, expires: number) => {
        const date = new Date()
        date.setTime(date.getTime() + expires)
        Cookies.set(username, value, { expires: date, path: '/' })
    }

    return (
        <div className="container-login" >
            <div className="wrap-login">
                <Form
                    form={form}
                    name="form__login"
                    labelCol={{ span: 8, }}
                    wrapperCol={{ span: 6, }}
                    onFinish={onFinish}
                    autoComplete="off" >
                    <span className="form__spanLogin">
                        システムにログインします。
                    </span>
                    <Form.Item
                        label="ログインID"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Input className="form__input" />
                    </Form.Item>
                    <Form.Item
                        label="パスワード"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16, }}>
                        <VButton htmlType="submit" className="form__submitAction">
                            ログイン
                        </VButton>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
