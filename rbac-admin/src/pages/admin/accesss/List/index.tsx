import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Drawer, Form } from 'antd';
import React, { useState, useRef, ReactNode } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryAccesss, updateAccess, addAccess } from './service';
import checkStaffAccess from '@/utils/checkAccess';
import { connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';
import {CurrentUser} from '@/models/user';
/**
 * 添加权限
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addAccess({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新权限
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在更新');
  try {
    await updateAccess({
      _id:fields._id,
      name:fields.name,
      desc:fields.desc
    });
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

interface Props {
  currentUser?: CurrentUser;
  children?: ReactNode;
  dispatch?:Dispatch
}

const TableList: React.FC<{}> = (props:Props) => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const currentUser = props.currentUser!
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '权限名称',
      dataIndex: 'name',
    },
    {
      title: '权限描述',
      dataIndex: 'desc',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '修改时间',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
         {
            checkStaffAccess(currentUser!,'access update')?(
              <a
                onClick={() => {
                  handleUpdateModalVisible(true);
                  setStepFormValues(record);
                }}
              >
                修改
              </a>
            ):null
          }
          <Divider type="vertical" />
          <a href="">删除</a>





        </>
      ),
    },
  ];

  // const columnsSave: ProColumns<TableListItem>[] = [
  //   {
  //     title: '用户名称',
  //     dataIndex: 'username',
  //   },
  //   {
  //     title: '用户密码',
  //     dataIndex: 'password',
  //   },
  // ];

  // 动态按钮
  const saveButton = ()=>{
    if(checkStaffAccess(currentUser!,'access save')){
      return (
        <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>
      )
    }else{
      return null
    }
  }

  return (


    <PageContainer>
      {/* 权限列表 */}
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="_id"
        search={false}
        pagination={{defaultPageSize:6}}
        toolBarRender={() => [
          saveButton(),
        ]}
        request={(params) => queryAccesss(params)}
        columns={columns}
        rowSelection={false}
      />

      {/* 创建权限 */}
      <CreateForm
      onCancel={() => handleModalVisible(false)}
      modalVisible={createModalVisible}>
        {/* <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            console.log(value);
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="_id"
          type="form"
          columns={columnsSave}
        /> */}

      <Form
        name="basic"
        style={{marginTop:8}}
        onFinish={
          async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        >
          <Form.Item
            label="权限名称"
            name="name"
            rules={[{ required: true, message: '请输入权限名!' }]}
          >
            <Input placeholder='请输入权限名 英文'/>
          </Form.Item>

          <Form.Item
            label="权限描述"
            name="desc"
            rules={[{ required: true, message: '请输入权限描述!' }]}
          >
            <Input placeholder='请输入权限描述 中文'/>
          </Form.Item>

          <Form.Item style={{marginTop:32}}>
            <Button type="primary" htmlType="submit">
              提交
            </Button >
            <Button style={{marginLeft:32}}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </CreateForm>

      {/* 修改权限 */}
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={
            async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

// export default TableList;
export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(TableList);
