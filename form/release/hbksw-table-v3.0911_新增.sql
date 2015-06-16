
use hbksw;

drop table if exists pushsample;
create table pushsample (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  name	varchar(50),
  sample varchar(255),
  createtime datetime,
  primary key (id)
) engine =innodb default charset =utf8;