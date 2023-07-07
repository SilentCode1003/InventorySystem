exports.MasterUser = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      usercode: key.mu_usercode,
      fullname: key.mu_fullname,
      username: key.mu_username,
      password: key.mu_password,
      accesstype: key.mu_accesstype,
      roletype: key.mu_roletype,
      position: key.mu_position,
      department: key.mu_department,
      status: key.mu_status,
      createdby: key.mu_createdby,
      createddate: key.mu_createddate,
    });
  });

  return dataResult;
};

exports.MasterAccessType = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      accesstypecode: key.mat_accesstypecode,
      accesstypename: key.mat_accesstypename,
      status: key.mat_status,
      createdby: key.mat_createdby,
      createddate: key.mat_createddate,
    });
  });

  return dataResult;
};

exports.MasterRoleType = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      roletypecode: key.mrt_roletypecode,
      roletypename: key.mrt_roletypename,
      status: key.mrt_status,
      createdby: key.mrt_createdby,
      createddate: key.mrt_createddate,
    });
  });

  return dataResult;
};

exports.MasterPosition = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      positioncode: key.mp_positioncode,
      positionname: key.mp_positionname,
      status: key.mp_status,
      createdby: key.mp_createdby,
      createddate: key.mp_createddate,
    });
  });

  return dataResult;
};

exports.MasterDepartment = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      departmentcode: key.md_departmentcode,
      departmentname: key.md_departmentname,
      status: key.md_status,
      createdby: key.md_createdby,
      createddate: key.md_createddate,
    });
  });

  return dataResult;
};

exports.MasterStore = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.ms_id,
      storename: key.ms_storename,
      status: key.ms_status,
      createdby: key.ms_createdby,
      createddate: key.ms_createddate,
    });
  });

  return dataResult;
};
