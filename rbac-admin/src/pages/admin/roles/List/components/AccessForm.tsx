import React, { useState, useEffect } from 'react';
import { Form, Button,  Modal, Checkbox, Row, Col } from 'antd';
import { TableListItem } from '../data.d';
import { TableListItem as AccessListItem} from '@/pages/Admin/accesss/List/data';
import { queryAccesss } from '@/pages/admin/accesss/List/service';
import { groupBy } from '@/utils/groupBy';
import { Typography } from 'antd';
const { Text } = Typography;

/**
 * 角色授权 组件
 */

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

const AccessForm: React.FC<UpdateFormProps> = (props) => {

  const [formVals, setFormVals] = useState<FormValueType>({
    _id:props.values._id,
    accesss:props.values.accesss,
  });

  const [allAccess,setAllAccess] = useState<AccessListItem[]>([])

  // 获取所有权限
  useEffect(()=>{
    async function getAllAccess(){
      const {status,data} = await queryAccesss()
      console.log(status,data);

      if(status){
        setAllAccess(data)
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

  // function onChange(checkedValues) {
  //   console.log('checked = ', checkedValues);
  // }

  // 内容组件
  const renderContent = () => {
    const allAccessGroup = groupBy(allAccess,(access)=>{
      return access.name.split(' ')[0]
    })

    const zhNames = {staff:'员工',role:'角色',access:'权限'}

    return (
      <>
        <Form.Item
          name="accesss"
          >
          <Checkbox.Group style={{ width: '100%' }} >
            {
              Object.keys(allAccessGroup).map(name=>(
                <div key={name}>
                  <Row><Text strong>{zhNames[name]}</Text></Row>
                  <Row>
                  {
                    allAccessGroup[name].map(access=>{
                      return (
                        <Col span={8} key={access._id}>
                          <Checkbox value={access._id} >{access.desc}</Checkbox>
                        </Col>
                        )
                      }
                    )
                  }
                </Row>
                </div>
              ))
            }
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
          accesss:formVals.accesss
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default AccessForm;
