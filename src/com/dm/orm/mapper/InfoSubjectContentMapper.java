package com.dm.orm.mapper;

import java.util.List;

import com.dm.orm.mapper.entity.InfoSubjectContent;

public interface InfoSubjectContentMapper extends ISqlMapper{

	
	//增加专题内容
 public	int doAddContent(InfoSubjectContent infoSubjectContent);

 
   //根据外键id查询全部专题内容编辑
public List<InfoSubjectContent> selectContentListByInfosubid(int infosubid);

//去修改
public InfoSubjectContent toTitleContentUpdateById(int id);

//根据id进行修改
public int titleContentDelete(int id);

//根据标题查询
public List<InfoSubjectContent> doSelectTypeConentByTitle(InfoSubjectContent infoSubjectContent);

//修改
public int doTitleContentUpdateById(InfoSubjectContent infoSubjectContent);

	
	
}
