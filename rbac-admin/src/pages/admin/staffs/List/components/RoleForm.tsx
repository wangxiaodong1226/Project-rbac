import React, { useState, useEffect } from 'react';
import { Form, Button,  Modal, Checkbox, Row, Col } from 'antd';
import { TableListItem } from '../data';
import { TableListItem as RoleTableListItem} from '@/pages/admin/roles/List/data'
import { queryRoles } from '@/pages/admin/roles/List/service';
import { Typography } from 'antd';
const { Text } = Typography;

export interface FormValueType extends Partial<TableListItem> {

}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const RoleForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    _id:props.values._id,
    roles:props.values.roles,
  });

  const [allRoles,setAllRoles] = useState<RoleTableListItem[]>([])

  // 获取所有权限
  useEffect(()=>{
    async function getAllAccess(){
      const {status,data} = await queryRoles()
      console.log(status,data);

      if(status){
        setAllRoles(data)
      }
    }
    getAllAccess()

  },[])

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


  // 遍历当前用户的所有角色的ids
  const getStaffRoleIds = (roles):string[]=>{
    return roles.map(role=>role._id)
  }

  // 内容组件
  const renderContent = () => {

    return (
      <>
         <Form.Item
           name="roles"
          >
          <Checkbox.Group style={{ width: '100%' }} >
                  <Row><Text strong>分配角色</Text></Row>
                  <Row>
                  {
                    allRoles.map(role=>{
                      return (
                        <Col span={8} key={role._id}>
                          <Checkbox value={role._id} >{role.desc}</Checkbox>
                        </Col>
                        )
                      }
                    )
                  }
                </Row>
          </Checkbox.Group>
        </Form.Item>
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
          roles: getStaffRoleIds(formVals.roles)
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default RoleForm;
