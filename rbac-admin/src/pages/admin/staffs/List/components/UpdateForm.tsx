import React, { useState } from 'react';
import { Form, Button,  Input, Modal } from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {

}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    _id:props.values._id,
    username:props.values.username,
    password:props.values.password,
  });

  const [form] = Form.useForm();

  // 映射属性
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  // 提交处理数据
  const handleNext = async () => {

    //fieldsValue： 搜集form 表单数据
    const fieldsValue = await form.validateFields();
    console.log('fieldsValue',fieldsValue);
    // formVals ： 一条记录 映射 对象（属性）
    console.log('formVals',formVals);
    setFormVals({ ...formVals, ...fieldsValue });

    // 提交更新 ： 调用父组件的onSubmit 属性方法
    handleUpdate({ ...formVals, ...fieldsValue });

  };
  // 内容组件
  const renderContent = () => {

    return (
      <>
        <FormItem
          name="username"
          label="用户名称"
          rules={[{ required: true, message: '请输入用户名称！' }]}
        >
          <Input placeholder="请输入用户名称" />
        </FormItem>
        <FormItem
          name="password"
          label="用户密码"
          rules={[{ required: true, message: '请输入至少6位！', min: 6 }]}
        >
          <Input placeholder="请输入密码" />
        </FormItem>
      </>
    );
  };

  // 提交组件
  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          提交
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="员工修改"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          _id:formVals._id,
          username: formVals.username,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
