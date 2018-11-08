/*
Navicat MySQL Data Transfer

Source Server         : 112
Source Server Version : 50639
Source Host           : 10.18.13.112:3306
Source Database       : f_sys_mgr

Target Server Type    : MYSQL
Target Server Version : 50639
File Encoding         : 65001

Date: 2018-10-23 10:51:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_article`
-- ----------------------------
DROP TABLE IF EXISTS `t_article`;
CREATE TABLE `t_article` (
  `id` varchar(50) NOT NULL DEFAULT '',
  `title` varchar(100) DEFAULT NULL,
  `type` int(2) DEFAULT NULL,
  `url` varchar(1000) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_article
-- ----------------------------

-- ----------------------------
-- Table structure for `t_menu`
-- ----------------------------
DROP TABLE IF EXISTS `t_menu`;
CREATE TABLE `t_menu` (
  `id` varchar(50) NOT NULL,
  `pid` varchar(50) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `route` varchar(100) DEFAULT NULL,
  `subordinateid` varchar(1000) DEFAULT NULL COMMENT '从属id，该数据属于id为subordinateid的数据的从属数据',
  `iconcls` varchar(50) DEFAULT NULL,
  `paramscount` int(3) DEFAULT NULL COMMENT '参数个数 /0/1代表2个参数',
  `issubordinate` tinyint(1) DEFAULT NULL COMMENT '是否为从属菜单',
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_menu
-- ----------------------------
INSERT INTO `t_menu` VALUES ('1', null, null, '全部菜单', null, null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('10', '3', '002002', '菜单二', null, null, 'bar-chart', null, null, null);
INSERT INTO `t_menu` VALUES ('11', '3', '002003', '菜单三', null, null, 'pie-chart', null, null, null);
INSERT INTO `t_menu` VALUES ('12', '4', '003001', '菜单一', '/main/module3/t_menu1', null, 'appstore-o', null, null, null);
INSERT INTO `t_menu` VALUES ('13', '4', '003002', '菜单二', null, null, 'mail', null, null, null);
INSERT INTO `t_menu` VALUES ('14', '4', '003003', '菜单三', null, null, 'notifiction', null, null, null);
INSERT INTO `t_menu` VALUES ('15', '4', '003004', '菜单四', null, null, 'home', null, null, null);
INSERT INTO `t_menu` VALUES ('16', '5', '004001', '菜单一', null, null, 'team', null, null, null);
INSERT INTO `t_menu` VALUES ('17', '5', '004002', '菜单二', null, null, 'message', null, null, null);
INSERT INTO `t_menu` VALUES ('18', '5', '004003', '菜单三', null, null, 'rocket', null, null, null);
INSERT INTO `t_menu` VALUES ('19', '5', '004004', '菜单四', null, null, 'safety', null, null, null);
INSERT INTO `t_menu` VALUES ('2', '1', '001', '管理系统', '/main/user/list', null, null, null, '0', null);
INSERT INTO `t_menu` VALUES ('20', '5', '004005', '菜单五', null, null, 'profile', null, null, null);
INSERT INTO `t_menu` VALUES ('21', '6', '001001001', '用户列表', '/main/user/list', '50,51', null, null, '0', '');
INSERT INTO `t_menu` VALUES ('22', '6', '001001002', '子菜单二', '/main/module1/t_menu1/sub2', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('23', '8', '001003001', '权限管理', '/main/permission/list', '52,53', null, null, null, null);
INSERT INTO `t_menu` VALUES ('24', '8', '001003002', '权限设置', '/main/permission-user/list', '54,55', null, null, null, null);
INSERT INTO `t_menu` VALUES ('25', '9', '002001001', '文章集锦', '/main/example/article', null, null, null, '0', null);
INSERT INTO `t_menu` VALUES ('26', '9', '002001002', '时间爆炸', '/main/example/time', null, null, null, '0', null);
INSERT INTO `t_menu` VALUES ('27', '10', '002002001', '子菜单一', '/main/module2/t_menu2/sub1', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('28', '10', '002002002', '子菜单二', '/main/module2/t_menu2/sub2', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('29', '11', '002003001', '子菜单一', '/main/module2/t_menu3/sub1', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('3', '1', '002', '知识乐园', '/main/example/article', null, null, null, '0', null);
INSERT INTO `t_menu` VALUES ('30', '11', '002003002', '子菜单二', '/main/module2/t_menu3/sub2', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('31', '13', '003002001', '子菜单一', '/main/module3/t_menu2/sub1', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('32', '13', '003002002', '子菜单二', '/main/module3/t_menu2/sub2', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('33', '13', '003002003', '子菜单三', '/main/module3/t_menu2/sub3', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('34', '13', '003002004', '子菜单四', '/main/module3/t_menu2/sub4', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('35', '14', '003003001', '子菜单一', '/main/module3/t_menu3/sub1', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('36', '14', '003003002', '子菜单二', '/main/module3/t_menu3/sub2', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('37', '15', '003004001', '子菜单一', '/main/module3/t_menu4/sub1', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('38', '15', '003004002', '子菜单二', '/main/module3/t_menu4/sub2', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('39', '15', '003004003', '子菜单三', '/main/module3/t_menu4/sub3', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('4', '1', '003', '模块三', '/main/module3', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('40', '16', '004001001', '子菜单一', '/main/module4/t_menu1/sub1', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('41', '16', '004001002', '子菜单二', '/main/module4/t_menu1/sub2', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('42', '17', '004002001', '子菜单一', '/main/module4/t_menu2/sub1', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('43', '17', '004002002', '子菜单二', '/main/module4/t_menu2/sub2', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('44', '18', '004003001', '子菜单一', '/main/module4/t_menu3/sub1', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('45', '18', '004003002', '子菜单二', '/main/module4/t_menu3/sub2', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('46', '19', '004004001', '子菜单一', '/main/module4/t_menu4/sub1', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('47', '19', '004004002', '子菜单二', '/main/module4/t_menu4/sub2', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('48', '20', '004005001', '子菜单一', '/main/module4/t_menu5/sub1', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('49', '20', '004005002', '子菜单二', '/main/module4/t_menu5/sub2', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('5', '1', '004', '模块四', '/main/module4', null, null, null, null, null);
INSERT INTO `t_menu` VALUES ('50', '21', '00100100101', '新增用户', '/main/user/info', null, null, '1', '1', '新增用户');
INSERT INTO `t_menu` VALUES ('51', '21', '00100100102', '编辑用户', '/main/user/info', null, null, '2', '1', '编辑用户');
INSERT INTO `t_menu` VALUES ('52', '23', '00100300101', '新增权限', '/main/permission/info', null, null, '1', '1', '新增权限');
INSERT INTO `t_menu` VALUES ('53', '23', '00100300102', '编辑权限', '/main/permission/info', null, null, '2', '1', '编辑权限');
INSERT INTO `t_menu` VALUES ('54', '24', '00100300201', '新增权限设置', '/main/permission-user/info', null, null, '1', '1', '新增权限设置');
INSERT INTO `t_menu` VALUES ('55', '24', '00100300202', '编辑权限设置', '/main/permission-user/info', null, null, '2', '1', '编辑权限设置');
INSERT INTO `t_menu` VALUES ('6', '2', '001001', '用户管理', '/main/user/list', null, 'team', null, null, null);
INSERT INTO `t_menu` VALUES ('7', '2', '001002', '菜单管理', '/main/menu', null, 'bars', null, null, null);
INSERT INTO `t_menu` VALUES ('8', '2', '001003', '系统设置', null, null, 'setting', null, null, null);
INSERT INTO `t_menu` VALUES ('9', '3', '002001', '初级园地', null, null, 'area-chart', null, '0', null);

-- ----------------------------
-- Table structure for `t_permission`
-- ----------------------------
DROP TABLE IF EXISTS `t_permission`;
CREATE TABLE `t_permission` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_permission
-- ----------------------------
INSERT INTO `t_permission` VALUES ('0986c734-37d7-400a-a4f1-484531069440', '模块2', '模块二');
INSERT INTO `t_permission` VALUES ('210857c0-659c-4ec6-9ffe-6c661faa82ab', '全部模块', '全部模块');
INSERT INTO `t_permission` VALUES ('48f42a98-bb0a-41bf-b55e-93044acd60f8', '模块4', '模块四');
INSERT INTO `t_permission` VALUES ('49488b3d-5a83-420e-97f6-5686dd38d021', '模块3', '模块三');
INSERT INTO `t_permission` VALUES ('b9ef9e52-8978-4622-a97c-2b3296f0e9d2', '模块1', '模块一');
INSERT INTO `t_permission` VALUES ('c88a015c-f14b-4cab-946b-ce64a1ecfb84', '管理系统', '仅管理系统');

-- ----------------------------
-- Table structure for `t_permission_menu`
-- ----------------------------
DROP TABLE IF EXISTS `t_permission_menu`;
CREATE TABLE `t_permission_menu` (
  `id` varchar(50) NOT NULL,
  `permissionid` varchar(50) DEFAULT NULL,
  `menuid` varchar(50) DEFAULT NULL,
  `ishalf` int(1) DEFAULT '0' COMMENT '是否未半选 0： 否 1： 是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_permission_menu
-- ----------------------------
INSERT INTO `t_permission_menu` VALUES ('024e6d0d-d7af-4c7c-b1f9-5ccad16e477e', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '2', '0');
INSERT INTO `t_permission_menu` VALUES ('03a8e3d0-66f7-4feb-ba86-08fa9521c93d', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '18', '0');
INSERT INTO `t_permission_menu` VALUES ('054d4c19-72b0-41d0-baac-73234665abd0', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '46', '0');
INSERT INTO `t_permission_menu` VALUES ('05d69e5e-31a8-484f-80f1-c4e873e25cc3', '49488b3d-5a83-420e-97f6-5686dd38d021', '31', '0');
INSERT INTO `t_permission_menu` VALUES ('07a99c5d-48f1-43b5-8199-471431a53583', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '6', '0');
INSERT INTO `t_permission_menu` VALUES ('081c6a25-da4b-431e-94bd-cdadbbdfbfcd', '0986c734-37d7-400a-a4f1-484531069440', '10', '0');
INSERT INTO `t_permission_menu` VALUES ('0d657da0-5352-40cc-83fa-e4847e58abb2', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '48', '0');
INSERT INTO `t_permission_menu` VALUES ('0d8e1057-febc-4b60-a9a8-d0aff7643e2b', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '18', '0');
INSERT INTO `t_permission_menu` VALUES ('0fbe12d6-a365-4199-a7a4-2914680fcf71', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '44', '0');
INSERT INTO `t_permission_menu` VALUES ('11270dc2-73be-496b-b9ed-f84b281fb708', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '47', '0');
INSERT INTO `t_permission_menu` VALUES ('116cca63-dd95-4910-be74-566a9a09aa39', '49488b3d-5a83-420e-97f6-5686dd38d021', '37', '0');
INSERT INTO `t_permission_menu` VALUES ('131e2a31-2e7a-4547-b8bc-3022f8229fcd', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '35', '0');
INSERT INTO `t_permission_menu` VALUES ('135965d3-f656-45a2-bb68-d59a43976722', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '23', '0');
INSERT INTO `t_permission_menu` VALUES ('13f9b695-0600-4c5d-b0ea-0451612a0226', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '15', '0');
INSERT INTO `t_permission_menu` VALUES ('162b02a9-5d6a-4a26-a3b6-b85feb62c925', '49488b3d-5a83-420e-97f6-5686dd38d021', '1', '1');
INSERT INTO `t_permission_menu` VALUES ('1bdfb0ef-0c79-42cd-a976-3f1164bd08b9', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '5', '0');
INSERT INTO `t_permission_menu` VALUES ('1ee5e53f-b4a4-4c97-87ae-c932b7fc2af0', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '25', '0');
INSERT INTO `t_permission_menu` VALUES ('1f03d590-af44-48d3-8982-bf3884880d89', '0986c734-37d7-400a-a4f1-484531069440', '25', '0');
INSERT INTO `t_permission_menu` VALUES ('1f4c1cdd-4cd7-4b10-8511-8370893a784e', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '1', '1');
INSERT INTO `t_permission_menu` VALUES ('20172fb3-13a9-45a9-be33-0a5953729d55', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '19', '0');
INSERT INTO `t_permission_menu` VALUES ('20e726f4-f47b-451e-9ff8-55bfe01e0198', 'c88a015c-f14b-4cab-946b-ce64a1ecfb84', '7', '0');
INSERT INTO `t_permission_menu` VALUES ('2131f49d-d2fb-40cb-9d83-062fb0213b3f', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '11', '0');
INSERT INTO `t_permission_menu` VALUES ('231628b4-9117-407a-9171-cbf0ad8ec388', '0986c734-37d7-400a-a4f1-484531069440', '1', '1');
INSERT INTO `t_permission_menu` VALUES ('255e43a2-3ee0-4b71-941d-e57e6dd8dde2', '0986c734-37d7-400a-a4f1-484531069440', '27', '0');
INSERT INTO `t_permission_menu` VALUES ('259bf184-1905-4dbf-aba1-25b44644d0f5', '0986c734-37d7-400a-a4f1-484531069440', '3', '0');
INSERT INTO `t_permission_menu` VALUES ('260dc1cc-6f37-41df-8351-aafe2772f7c7', '49488b3d-5a83-420e-97f6-5686dd38d021', '39', '0');
INSERT INTO `t_permission_menu` VALUES ('262385c1-cd8d-4e5b-846c-8af3a1f1109c', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '5', '0');
INSERT INTO `t_permission_menu` VALUES ('26f672f8-702f-4dfd-9cff-8d8033446434', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '19', '0');
INSERT INTO `t_permission_menu` VALUES ('2b15e6b7-505c-4098-b240-efc466afbd9c', 'b9ef9e52-8978-4622-a97c-2b3296f0e9d2', '7', '0');
INSERT INTO `t_permission_menu` VALUES ('2cc2c77b-d08c-43c3-b44e-ebc814ac51d8', '49488b3d-5a83-420e-97f6-5686dd38d021', '34', '0');
INSERT INTO `t_permission_menu` VALUES ('31e4e4e3-87c8-4ea2-bcc5-bc80028ee52b', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '39', '0');
INSERT INTO `t_permission_menu` VALUES ('39e0c667-d398-4250-b04b-be4681b3c46c', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '24', '0');
INSERT INTO `t_permission_menu` VALUES ('3a84c4f3-3a16-4c2f-90de-02eb9bc56b84', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '36', '0');
INSERT INTO `t_permission_menu` VALUES ('3adb883f-7ae1-4614-865f-f2b977d81adc', 'c88a015c-f14b-4cab-946b-ce64a1ecfb84', '8', '0');
INSERT INTO `t_permission_menu` VALUES ('3f581921-6fef-40e9-b96a-9c733f6f0784', '49488b3d-5a83-420e-97f6-5686dd38d021', '35', '0');
INSERT INTO `t_permission_menu` VALUES ('41c1f4f4-1940-4963-839e-b790bc9bbc21', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '1', '0');
INSERT INTO `t_permission_menu` VALUES ('4462f9a7-157f-4d3c-b4ad-de89bd9fe5b0', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '22', '0');
INSERT INTO `t_permission_menu` VALUES ('470a467f-dca2-4806-840d-22a1ae5011f8', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '49', '0');
INSERT INTO `t_permission_menu` VALUES ('471d129a-01a5-4a2e-b7c1-d81f28b6a612', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '29', '0');
INSERT INTO `t_permission_menu` VALUES ('4a7ced47-6a0e-4915-97af-11d9dd7e9671', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '30', '0');
INSERT INTO `t_permission_menu` VALUES ('4d40c912-f7e7-4679-9348-836367979c25', 'b9ef9e52-8978-4622-a97c-2b3296f0e9d2', '2', '0');
INSERT INTO `t_permission_menu` VALUES ('5931bc8b-6453-40ed-ab23-50999ad3af91', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '44', '0');
INSERT INTO `t_permission_menu` VALUES ('5fd67de0-69a3-48d8-acb3-6cdbf7d4d727', 'c88a015c-f14b-4cab-946b-ce64a1ecfb84', '21', '0');
INSERT INTO `t_permission_menu` VALUES ('6035a8e4-710b-409e-9de8-a7197ace388d', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '17', '0');
INSERT INTO `t_permission_menu` VALUES ('608d0979-171d-490c-8ba7-2fbd6a3678c0', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '40', '0');
INSERT INTO `t_permission_menu` VALUES ('62801b0b-2672-4566-83c4-fa21d162be82', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '38', '0');
INSERT INTO `t_permission_menu` VALUES ('65d1c21b-8f5a-4be1-a5a0-05a471c8a224', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '13', '0');
INSERT INTO `t_permission_menu` VALUES ('68989058-fd4e-4f0c-b36c-17319496b929', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '31', '0');
INSERT INTO `t_permission_menu` VALUES ('6b6ad49b-2702-4c21-b8dc-3cf50a7d5437', 'b9ef9e52-8978-4622-a97c-2b3296f0e9d2', '22', '0');
INSERT INTO `t_permission_menu` VALUES ('6c022b60-b282-4eb9-8532-f604eaf2b47f', 'b9ef9e52-8978-4622-a97c-2b3296f0e9d2', '21', '0');
INSERT INTO `t_permission_menu` VALUES ('6d7a6799-2e38-4446-ab4f-eec30830abec', '49488b3d-5a83-420e-97f6-5686dd38d021', '33', '0');
INSERT INTO `t_permission_menu` VALUES ('6dd9499c-3bbb-4783-b6b2-4f64ccbbf63e', 'b9ef9e52-8978-4622-a97c-2b3296f0e9d2', '8', '0');
INSERT INTO `t_permission_menu` VALUES ('6e155ac4-ab74-4372-b035-f2aa222fd961', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '20', '0');
INSERT INTO `t_permission_menu` VALUES ('6f40441f-3b36-4bd6-a99a-e9d65a0a509e', '0986c734-37d7-400a-a4f1-484531069440', '28', '0');
INSERT INTO `t_permission_menu` VALUES ('721e3ed6-0299-4aa0-92aa-8bff166766a7', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '48', '0');
INSERT INTO `t_permission_menu` VALUES ('722ead75-07a8-414e-9bf8-6b40e1baed67', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '41', '0');
INSERT INTO `t_permission_menu` VALUES ('756f5baf-18d8-408c-b9ce-5cffd72975b3', '49488b3d-5a83-420e-97f6-5686dd38d021', '38', '0');
INSERT INTO `t_permission_menu` VALUES ('75b04e55-0fbc-4a26-af78-b887775287d4', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '42', '0');
INSERT INTO `t_permission_menu` VALUES ('75c39a7c-8753-4c1c-adac-931214b68223', '0986c734-37d7-400a-a4f1-484531069440', '26', '0');
INSERT INTO `t_permission_menu` VALUES ('77ea1696-a116-4450-a0e3-cf57a9cd7c99', '49488b3d-5a83-420e-97f6-5686dd38d021', '15', '0');
INSERT INTO `t_permission_menu` VALUES ('7ce8356b-e971-40c1-9bf1-7abbcdbd01ae', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '7', '0');
INSERT INTO `t_permission_menu` VALUES ('7d9f62b6-c00c-4a00-a899-dbd993c2519c', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '9', '0');
INSERT INTO `t_permission_menu` VALUES ('8452ea67-b907-4edf-b76d-ef6e98eefb98', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '26', '0');
INSERT INTO `t_permission_menu` VALUES ('84ae8dd1-e78e-4486-a9fe-6ca407098de9', 'c88a015c-f14b-4cab-946b-ce64a1ecfb84', '23', '0');
INSERT INTO `t_permission_menu` VALUES ('865ee93a-e608-4ee5-a8b0-21bb761e1ead', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '28', '0');
INSERT INTO `t_permission_menu` VALUES ('8ed35307-ac4e-46cd-b1e8-34558c32f059', 'b9ef9e52-8978-4622-a97c-2b3296f0e9d2', '23', '0');
INSERT INTO `t_permission_menu` VALUES ('8f5f20e0-9dde-4773-9e4b-d2b4332c4aaf', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '41', '0');
INSERT INTO `t_permission_menu` VALUES ('911b1778-f32d-4427-96ef-5f188963ef39', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '43', '0');
INSERT INTO `t_permission_menu` VALUES ('92110e1a-216b-4a0e-aa61-a4498a6c5e44', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '34', '0');
INSERT INTO `t_permission_menu` VALUES ('96060337-3348-413d-9439-00d86a93461f', '49488b3d-5a83-420e-97f6-5686dd38d021', '13', '0');
INSERT INTO `t_permission_menu` VALUES ('a3ee0099-bc66-47c1-a6b1-2dd06400c642', '49488b3d-5a83-420e-97f6-5686dd38d021', '36', '0');
INSERT INTO `t_permission_menu` VALUES ('a47fbdc8-99d0-4beb-8e2b-4fff044d4a76', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '27', '0');
INSERT INTO `t_permission_menu` VALUES ('ad1952b8-1d22-4935-93c0-f8466646791b', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '20', '0');
INSERT INTO `t_permission_menu` VALUES ('ae91554a-df4d-4952-97d6-1a56388f6543', '49488b3d-5a83-420e-97f6-5686dd38d021', '12', '0');
INSERT INTO `t_permission_menu` VALUES ('b3b1dd0a-fce5-41a5-af1f-b13b7400b99b', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '47', '0');
INSERT INTO `t_permission_menu` VALUES ('bb0aca27-0d54-43b7-8157-3344d1e802c2', 'b9ef9e52-8978-4622-a97c-2b3296f0e9d2', '6', '0');
INSERT INTO `t_permission_menu` VALUES ('bb3fab08-3e5d-496e-b013-c11d7eebb286', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '21', '0');
INSERT INTO `t_permission_menu` VALUES ('bc1a817a-51c9-4522-8439-03d4efa75219', '49488b3d-5a83-420e-97f6-5686dd38d021', '4', '0');
INSERT INTO `t_permission_menu` VALUES ('bd90f30b-69c4-49ce-aa57-13343c2af556', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '33', '0');
INSERT INTO `t_permission_menu` VALUES ('c08e12ac-75de-43c3-a730-a6b22d363cc5', 'b9ef9e52-8978-4622-a97c-2b3296f0e9d2', '1', '1');
INSERT INTO `t_permission_menu` VALUES ('c0fa19b7-c0b4-4b63-b11c-1e97937f8f83', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '43', '0');
INSERT INTO `t_permission_menu` VALUES ('c39b6c79-a66d-498c-8b1c-66ad10c9eeaa', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '14', '0');
INSERT INTO `t_permission_menu` VALUES ('c8ee2c7b-ff1e-4294-a147-157bb329e74e', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '8', '0');
INSERT INTO `t_permission_menu` VALUES ('cbedb787-03af-469b-b504-fd78b0cece9f', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '12', '0');
INSERT INTO `t_permission_menu` VALUES ('ce3bf7f2-4e5a-49d2-ac02-7cd7b249b616', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '45', '0');
INSERT INTO `t_permission_menu` VALUES ('ceb66703-7287-4f66-8921-c85b2a849e52', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '42', '0');
INSERT INTO `t_permission_menu` VALUES ('d1ce95be-bec4-4c7b-985f-e327aafe12ab', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '40', '0');
INSERT INTO `t_permission_menu` VALUES ('d23d60bb-c220-44c5-96f7-5da1fb9b7ac5', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '49', '0');
INSERT INTO `t_permission_menu` VALUES ('d42788ca-5d0d-449b-8174-9806f9bcbeae', '0986c734-37d7-400a-a4f1-484531069440', '30', '0');
INSERT INTO `t_permission_menu` VALUES ('d57b4bf1-a725-4078-9155-d115aa754b64', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '17', '0');
INSERT INTO `t_permission_menu` VALUES ('d6e85934-1e95-4bbb-aac1-a090882ceb0c', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '37', '0');
INSERT INTO `t_permission_menu` VALUES ('d93b435f-41e2-4e30-b24f-3d3e2530b9b6', 'c88a015c-f14b-4cab-946b-ce64a1ecfb84', '2', '0');
INSERT INTO `t_permission_menu` VALUES ('dc7ad841-a9a7-4195-8dc4-996e0900c925', '0986c734-37d7-400a-a4f1-484531069440', '29', '0');
INSERT INTO `t_permission_menu` VALUES ('e26f42f1-353e-4a62-abda-c14d4c74405a', '0986c734-37d7-400a-a4f1-484531069440', '11', '0');
INSERT INTO `t_permission_menu` VALUES ('e2dfe88d-3601-443a-9de1-62267cbbf8f1', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '16', '0');
INSERT INTO `t_permission_menu` VALUES ('e44e345f-b607-4f26-8af1-708c98d85ce2', 'c88a015c-f14b-4cab-946b-ce64a1ecfb84', '6', '0');
INSERT INTO `t_permission_menu` VALUES ('e51814b6-fcfa-4127-8a05-dec507946c7e', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '3', '0');
INSERT INTO `t_permission_menu` VALUES ('e57a965f-5c78-4840-847e-84d454ddd3fc', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '46', '0');
INSERT INTO `t_permission_menu` VALUES ('e5ba5ed2-01f3-4cc5-bb01-0ab504024765', '49488b3d-5a83-420e-97f6-5686dd38d021', '14', '0');
INSERT INTO `t_permission_menu` VALUES ('e5cd88fd-1cd3-4c52-b615-97e1b045b924', 'c88a015c-f14b-4cab-946b-ce64a1ecfb84', '24', '0');
INSERT INTO `t_permission_menu` VALUES ('e8d2f93b-703d-4b36-bec3-6b840a87f7d4', 'c88a015c-f14b-4cab-946b-ce64a1ecfb84', '1', '1');
INSERT INTO `t_permission_menu` VALUES ('eae7ddf7-3485-4f49-baff-11e97aa733ba', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '32', '0');
INSERT INTO `t_permission_menu` VALUES ('eaef6c73-bd55-431b-95c6-a8b5b92d50ac', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '16', '0');
INSERT INTO `t_permission_menu` VALUES ('f462d975-9cc8-4847-9b24-1548b062e204', 'b9ef9e52-8978-4622-a97c-2b3296f0e9d2', '24', '0');
INSERT INTO `t_permission_menu` VALUES ('f480998e-d6e1-48cb-8f10-956005591ad3', '49488b3d-5a83-420e-97f6-5686dd38d021', '32', '0');
INSERT INTO `t_permission_menu` VALUES ('f7b37a33-1085-45a6-851a-dfe26749ff36', '48f42a98-bb0a-41bf-b55e-93044acd60f8', '45', '0');
INSERT INTO `t_permission_menu` VALUES ('f9e0f0b3-041f-41ff-adc3-e6b92f579509', '0986c734-37d7-400a-a4f1-484531069440', '9', '0');
INSERT INTO `t_permission_menu` VALUES ('fa12d88e-d647-458a-9017-ae73eaad3f6d', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '10', '0');
INSERT INTO `t_permission_menu` VALUES ('fc6fa5b5-dda6-4350-b085-629c481443f7', 'c88a015c-f14b-4cab-946b-ce64a1ecfb84', '22', '0');
INSERT INTO `t_permission_menu` VALUES ('fc8094a9-e0b0-4714-9ddf-b53fb12aa156', '210857c0-659c-4ec6-9ffe-6c661faa82ab', '4', '0');

-- ----------------------------
-- Table structure for `t_permission_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_permission_user`;
CREATE TABLE `t_permission_user` (
  `id` varchar(50) NOT NULL,
  `permissionid` varchar(50) DEFAULT NULL,
  `userid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_permission_user
-- ----------------------------
INSERT INTO `t_permission_user` VALUES ('1467759f-ee7d-4f57-9883-d25c862cd6e1', '49488b3d-5a83-420e-97f6-5686dd38d021', '001');
INSERT INTO `t_permission_user` VALUES ('152ab5a7-1467-4ad4-8c99-cfc918c6696a', '210857c0-659c-4ec6-9ffe-6c661faa82ab', 'cd74e4a7-c369-4c55-90c7-9d38f13664cf');
INSERT INTO `t_permission_user` VALUES ('b2e99e8f-bd41-4751-8045-b88cd7de942f', '48f42a98-bb0a-41bf-b55e-93044acd60f8', 'df231d93-8ffe-418f-a309-1a0abdd88fae');

-- ----------------------------
-- Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `pwd` varchar(100) DEFAULT NULL,
  `loginname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('001', '张大胆', '1111111', 'zhangdd');
INSERT INTO `t_user` VALUES ('329d9a62-0b20-4ed1-b527-5c13772b4721', '吴明', 'd3VtMTIzNDU2', 'wum');
INSERT INTO `t_user` VALUES ('cd74e4a7-c369-4c55-90c7-9d38f13664cf', '张大炮', 'emhhbmdkcDEyMzQ1Ng==', 'zhangdp');
INSERT INTO `t_user` VALUES ('df231d93-8ffe-418f-a309-1a0abdd88fae', '李多海', 'bGlkaDEyMzQ1Ng==', 'lidh');
