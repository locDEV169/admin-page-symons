import { UploadOutlined } from '@ant-design/icons'
import { default as notification } from 'antd/es/notification'
import 'antd/es/notification/style/css'
import { default as Upload } from 'antd/es/upload'
import 'antd/es/upload/style/css'
import { UploadFile } from 'antd/lib/upload/interface'
import axios from 'axios'
import { URL_UPLOAD } from 'constants/api'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import { default as React, useState } from 'react'
import { VButton } from 'vendor/pages'

const api = axios.create({
    baseURL: `${URL_UPLOAD}`
})

interface Props {
    customRequest: (values: string) => void
    onRemove: (values: string) => void
    fileList?: any
}

interface ErrorType {
    response: {
        status?: number
    }
}

export default function UploadImage(props: Props) {
    const { customRequest, onRemove } = props
    const [fileList, setFileList] = useState<UploadFile[]>(props.fileList ? props.fileList : [])

    const validateBeforeUpload = (file: File, files: File[]) => {
        let message = ''

        const totalValid = files.length + fileList.length
        if (totalValid > 5) message = 'Please select file upload 5 files'

        const typeValid = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
        if (!typeValid) message = 'Please select file png or jpg'

        const sizeValid = file.size <= 5 * 1024 * 1024
        if (!sizeValid) message = 'File upload too large , select file image upload under 5MB'

        if (message) {
            mess(message)
            return false
        }
        return true
    }

    const uploadImg = async (options: UploadRequestOption) => {
        const { file } = options
        const formData = new FormData()
        formData.append('image', file)
        api.post('/image', formData)
            .then((res) => {
                const url = `${URL_UPLOAD}` + res.data.data.image
                setFileList((state) => [
                    ...state,
                    { name: res.data.data.image, status: 'done', url: url, uid: res.data.data.image }
                ])
                customRequest(res.data.data.image)
            })
            .catch((err: ErrorType) => handleError(err))
    }

    const onDelete = (value: string) => {
        api.delete(value)
            .then(() => {
                const newList = fileList.filter((item) => item.name !== value)
                onRemove(value)
                setFileList(newList)
                notification.success({
                    message: 'Delete Successfully',
                    description: 'Delete image upload successfully'
                })
            })
            .catch((err: ErrorType) => handleError(err))
    }

    const handleError = (error: ErrorType) => {
        console.log(error.response?.status)
        const status = error.response?.status
        switch (status) {
            case 400:
                mess(' Upload Image Failed', 'Please select images 5 files, JPG or PNG and each under 5MB')
                break
            case 404:
                mess('Upload or Delete IMG failed')
                break
            case 500:
                mess('Image is not exist')
                break
            default:
                mess('Request Upload Image Failed', 'Request Upload Image failed')
        }
    }

    return (
        <Upload
            fileList={fileList}
            multiple={true}
            listType='picture-card'
            beforeUpload={(file, files) => validateBeforeUpload(file, files)}
            customRequest={(option) => uploadImg(option)}
            onRemove={(file) => onDelete(file.name)}>
            <VButton icon={<UploadOutlined />}></VButton>
        </Upload>
    )
}

function mess(message: string, description?: string) {
    notification.error({
        message: message,
        description: description
    })
}
