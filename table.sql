drop table if exists towns, registrationNumber;

create table towns (
id serial not null primary key,
town text not null,
reginitial text not null );

create table registrationNumber (
id serial not null primary key,
town_id int not null,
registrations text not null unique,
foreign key (town_id) REFERENCES towns(id)
);

insert into towns (town,reginitial) values ('Malmesbury' , 'CK');
insert into towns (town,reginitial) values ('Bellville' , 'CY');
insert into towns (town,reginitial) values ('Cape Town' , 'CA');
insert into towns (town,reginitial) values ('George' , 'CAW');
insert into towns (town,reginitial) values ('All' , 'All');
