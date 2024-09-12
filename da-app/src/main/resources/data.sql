--INSERT INTO oauth_client_details
--	(client_id, client_secret, scope, authorized_grant_types,
--	web_server_redirect_uri, authorities, access_token_validity,
--	refresh_token_validity, additional_information, autoapprove)
--VALUES
--	('fooClientIdPassword', '$2a$10$7yhqrOyvOieA6H2R9WOgxOXvCAEagNihZe1hFsluwFEJy9HbYCz2q', 'bar,foo,read,write',
--	'password,authorization_code,refresh_token,client_credentials', null, null, 36000, 36000, null, true);
--INSERT INTO oauth_client_details
--	(client_id, client_secret, scope, authorized_grant_types,
--	web_server_redirect_uri, authorities, access_token_validity,
--	refresh_token_validity, additional_information, autoapprove)
--VALUES
--	('sampleClientId', 'secret', 'read,write,foo,bar',
--	'implicit', null, null, 36000, 36000, null, false);
--INSERT INTO oauth_client_details
--	(client_id, client_secret, scope, authorized_grant_types,
--	web_server_redirect_uri, authorities, access_token_validity,
--	refresh_token_validity, additional_information, autoapprove)
--VALUES
--	('barClientIdPassword', '$2a$10$7yhqrOyvOieA6H2R9WOgxOXvCAEagNihZe1hFsluwFEJy9HbYCz2q', 'bar,foo,read,write',
--	'password,authorization_code,refresh_token', null, null, 36000, 36000, null, true);

INSERT INTO oauth_client_details
	(client_id, client_secret, scope, authorized_grant_types,
	web_server_redirect_uri, authorities, access_token_validity,
	refresh_token_validity, additional_information, autoapprove)
VALUES
	("core_client", "$2a$10$ePZ9kwbN2JyipmgJeCT4RudBZJ5Cwt6HeI1KzdHwJt37.WUFAE.a2", "read,write,delete", "password,authorization_code,refresh_token", null, null, 36000, 36000, null, true);	

INSERT INTO oauth_client_details
	(client_id, client_secret, scope, authorized_grant_types,
	web_server_redirect_uri, authorities, access_token_validity,
	refresh_token_validity, additional_information, autoapprove)
VALUES
	("example_client", "$2a$10$ePZ9kwbN2JyipmgJeCT4RudBZJ5Cwt6HeI1KzdHwJt37.WUFAE.a2", "read,write,delete", "password,authorization_code,refresh_token", null, null, 36000, 36000, null, true);		