# service-management-ops

Service Management operations tool

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![License](https://img.shields.io/npm/l/service-management-ops.svg)](https://github.com/pagopa/service-management-ops/blob/master/package.json)

<!-- toc -->
* [service-management-ops](#service-management-ops)
* [Requirements](#requirements)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Requirements

### Environment variables
The following sets of commands require the environment variabiles listed in the table below:
`api-services:*`, `users:*`, `migrate-service`.

| Variable name                     | Description                                                                       | type   |
|-----------------------------------|-----------------------------------------------------------------------------------|--------|
| BASE_URL_ADMIN                    | The URL of the admin functions API                                                | string |
| OCP_APIM                          | The key used to authenticate to the admin functions API                           | string |

# Usage

<!-- usage -->
```sh-session
$ npm install -g service-management-ops
$ service-management-ops COMMAND
running command...
$ service-management-ops (--version)
service-management-ops/1.0.0 darwin-x64 node-v18.13.0
$ service-management-ops --help [COMMAND]
USAGE
  $ service-management-ops COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`service-management-ops api-services:create`](#service-management-ops-api-servicescreate)
* [`service-management-ops api-services:get SERVICEID`](#service-management-ops-api-servicesget-serviceid)
* [`service-management-ops api-services:get-all`](#service-management-ops-api-servicesget-all)
* [`service-management-ops api-services:keys SERVICEID`](#service-management-ops-api-serviceskeys-serviceid)
* [`service-management-ops api-services:keys-regenerate SERVICEID`](#service-management-ops-api-serviceskeys-regenerate-serviceid)
* [`service-management-ops api-services:logo SERVICEID`](#service-management-ops-api-serviceslogo-serviceid)
* [`service-management-ops api-services:update`](#service-management-ops-api-servicesupdate)
* [`service-management-ops hello`](#service-management-ops-hello)
* [`service-management-ops help [COMMANDS]`](#service-management-ops-help-commands)
* [`service-management-ops messages:attributes`](#service-management-ops-messagesattributes)
* [`service-management-ops messages:check-content`](#service-management-ops-messagescheck-content)
* [`service-management-ops messages:list FISCALCODE`](#service-management-ops-messageslist-fiscalcode)
* [`service-management-ops migrate-services METADATA`](#service-management-ops-migrate-services-metadata)
* [`service-management-ops plugins`](#service-management-ops-plugins)
* [`service-management-ops plugins:install PLUGIN...`](#service-management-ops-pluginsinstall-plugin)
* [`service-management-ops plugins:inspect PLUGIN...`](#service-management-ops-pluginsinspect-plugin)
* [`service-management-ops plugins:install PLUGIN...`](#service-management-ops-pluginsinstall-plugin-1)
* [`service-management-ops plugins:link PLUGIN`](#service-management-ops-pluginslink-plugin)
* [`service-management-ops plugins:uninstall PLUGIN...`](#service-management-ops-pluginsuninstall-plugin)
* [`service-management-ops plugins:uninstall PLUGIN...`](#service-management-ops-pluginsuninstall-plugin-1)
* [`service-management-ops plugins:uninstall PLUGIN...`](#service-management-ops-pluginsuninstall-plugin-2)
* [`service-management-ops plugins:update`](#service-management-ops-pluginsupdate)
* [`service-management-ops profiles:delete FISCALCODE`](#service-management-ops-profilesdelete-fiscalcode)
* [`service-management-ops profiles:exist`](#service-management-ops-profilesexist)
* [`service-management-ops profiles:list`](#service-management-ops-profileslist)
* [`service-management-ops selfcare:addDelegate`](#service-management-ops-selfcareadddelegate)
* [`service-management-ops selfcare:manualOnboarding BODY`](#service-management-ops-selfcaremanualonboarding-body)
* [`service-management-ops services:check`](#service-management-ops-servicescheck)
* [`service-management-ops services:details`](#service-management-ops-servicesdetails)
* [`service-management-ops services:list`](#service-management-ops-serviceslist)
* [`service-management-ops subscriptions:list-delete DELETEFILEPATH [DELAYONDELETE] [OWNEREMAIL]`](#service-management-ops-subscriptionslist-delete-deletefilepath-delayondelete-owneremail)
* [`service-management-ops users:create`](#service-management-ops-userscreate)
* [`service-management-ops users:get EMAIL`](#service-management-ops-usersget-email)
* [`service-management-ops users:get-all`](#service-management-ops-usersget-all)
* [`service-management-ops users:subscription EMAIL SUBSCRIPTIONID`](#service-management-ops-userssubscription-email-subscriptionid)
* [`service-management-ops users:update-groups EMAIL`](#service-management-ops-usersupdate-groups-email)
* [`service-management-ops users:update_user_token_name EMAIL TOKENNAMEVALUE`](#service-management-ops-usersupdate_user_token_name-email-tokennamevalue)
* [`service-management-ops users:write-messages EMAIL ACTION`](#service-management-ops-userswrite-messages-email-action)
* [`service-management-ops users:write-services EMAIL ACTION`](#service-management-ops-userswrite-services-email-action)

## `service-management-ops api-services:create`

Create a service

```
USAGE
  $ service-management-ops api-services:create --payload <value>

FLAGS
  --payload=<value>  (required) JSON string rapresentation of a service

DESCRIPTION
  Create a service

EXAMPLES
  $ service-management-ops api-service:create  --json='{ "authorized_cidrs": [], "authorized_recipients": [], "department_name": "department_test", "organization_fiscal_code": "12345670013", "organization_name": "organization_name", "service_id": "test-api-123", "service_name": "test_name", "is_visible": false, "max_allowed_payment_amount": 0, "require_secure_channels": false }'
```

_See code: [src/commands/api-services/create.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/api-services/create.ts)_

## `service-management-ops api-services:get SERVICEID`

Get the service by serviceId

```
USAGE
  $ service-management-ops api-services:get SERVICEID

ARGUMENTS
  SERVICEID  id of the service

DESCRIPTION
  Get the service by serviceId

EXAMPLES
  $ service-management-ops api-service:get  SERVICEID
```

_See code: [src/commands/api-services/get.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/api-services/get.ts)_

## `service-management-ops api-services:get-all`

Get all services

```
USAGE
  $ service-management-ops api-services:get-all

DESCRIPTION
  Get all services

EXAMPLES
  $ service-management-ops api-service:get-all
```

_See code: [src/commands/api-services/get-all.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/api-services/get-all.ts)_

## `service-management-ops api-services:keys SERVICEID`

Get subscription keys associated to service

```
USAGE
  $ service-management-ops api-services:keys SERVICEID

ARGUMENTS
  SERVICEID  id of the service

DESCRIPTION
  Get subscription keys associated to service

EXAMPLES
  $ service-management-ops api-service:keys SERVICEID
```

_See code: [src/commands/api-services/keys.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/api-services/keys.ts)_

## `service-management-ops api-services:keys-regenerate SERVICEID`

Regenerate keys associated to service

```
USAGE
  $ service-management-ops api-services:keys-regenerate SERVICEID --key_type PRIMARY_KEY|SECONDARY_KEY

ARGUMENTS
  SERVICEID  id of the service

FLAGS
  --key_type=<option>  (required) JSON string rapresentation of a service
                       <options: PRIMARY_KEY|SECONDARY_KEY>

DESCRIPTION
  Regenerate keys associated to service

EXAMPLES
  $ service-management-ops api-service:keys-regenerate  SERVICEID --key_type=PRIMARY_KEY
```

_See code: [src/commands/api-services/keys-regenerate.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/api-services/keys-regenerate.ts)_

## `service-management-ops api-services:logo SERVICEID`

Update service data with base64 of the logo

```
USAGE
  $ service-management-ops api-services:logo SERVICEID --logo <value>

ARGUMENTS
  SERVICEID  id of the service

FLAGS
  --logo=<value>  (required) Path of logo image to be uploaded

DESCRIPTION
  Update service data with base64 of the logo

EXAMPLES
  $ service-management-ops api-service:logo SERVICEID --logo ~/PATH/logo.png
```

_See code: [src/commands/api-services/logo.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/api-services/logo.ts)_

## `service-management-ops api-services:update`

Update a service

```
USAGE
  $ service-management-ops api-services:update --payload <value>

FLAGS
  --payload=<value>  (required) JSON string rapresentation of a service

DESCRIPTION
  Update a service

EXAMPLES
  $ service-management-ops api-service:update  --json='{ "authorized_cidrs": [], "authorized_recipients": [], "department_name": "department_test", "organization_fiscal_code": "12345670013", "organization_name": "organization_name", "service_id": "test-api-123", "service_name": "test_name", "is_visible": false, "max_allowed_payment_amount": 0, "require_secure_channels": false }'
```

_See code: [src/commands/api-services/update.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/api-services/update.ts)_

## `service-management-ops hello`

describe the command here

```
USAGE
  $ service-management-ops hello [-h] [-n <value>] [-f]

FLAGS
  -f, --force
  -h, --help          Show CLI help.
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ service-management-ops hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/hello.ts)_

## `service-management-ops help [COMMANDS]`

Display help for service-management-ops.

```
USAGE
  $ service-management-ops help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for service-management-ops.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.10/src/commands/help.ts)_

## `service-management-ops messages:attributes`

Update message attributes

```
USAGE
  $ service-management-ops messages:attributes -i <value> [-p <value>] [--isPending true|false|undefined]

FLAGS
  -i, --input=<value>     (required) Input file (CSV, with path as first column)
  -p, --parallel=<value>  [default: 1] Number of parallel workers to run
  --isPending=<option>    Set 'isPending' flag
                          <options: true|false|undefined>

DESCRIPTION
  Update message attributes
```

_See code: [src/commands/messages/attributes.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/messages/attributes.ts)_

## `service-management-ops messages:check-content`

Checks validity of messages

```
USAGE
  $ service-management-ops messages:check-content [-i <value>] [-p <value>]

FLAGS
  -i, --input=<value>     Input file (CSV, with path as first column) - defaults to stdin
  -p, --parallel=<value>  [default: 1] Number of parallel workers to run

DESCRIPTION
  Checks validity of messages
```

_See code: [src/commands/messages/check-content.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/messages/check-content.ts)_

## `service-management-ops messages:list FISCALCODE`

List messages for a fiscalCode

```
USAGE
  $ service-management-ops messages:list FISCALCODE

DESCRIPTION
  List messages for a fiscalCode
```

_See code: [src/commands/messages/list.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/messages/list.ts)_

## `service-management-ops migrate-services METADATA`

Migrate metadata or logos from github

```
USAGE
  $ service-management-ops migrate-services METADATA

ARGUMENTS
  METADATA  (metadata|logo) Migrate metadata or logo from github

DESCRIPTION
  Migrate metadata or logos from github

EXAMPLES
  $ service-management-ops migrate metadata

  $ service-management-ops migrate logo
```

_See code: [src/commands/migrate-services.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/migrate-services.ts)_

## `service-management-ops plugins`

List installed plugins.

```
USAGE
  $ service-management-ops plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ service-management-ops plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `service-management-ops plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ service-management-ops plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ service-management-ops plugins:add

EXAMPLES
  $ service-management-ops plugins:install myplugin 

  $ service-management-ops plugins:install https://github.com/someuser/someplugin

  $ service-management-ops plugins:install someuser/someplugin
```

## `service-management-ops plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ service-management-ops plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ service-management-ops plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/inspect.ts)_

## `service-management-ops plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ service-management-ops plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ service-management-ops plugins:add

EXAMPLES
  $ service-management-ops plugins:install myplugin 

  $ service-management-ops plugins:install https://github.com/someuser/someplugin

  $ service-management-ops plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/install.ts)_

## `service-management-ops plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ service-management-ops plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ service-management-ops plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/link.ts)_

## `service-management-ops plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ service-management-ops plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ service-management-ops plugins:unlink
  $ service-management-ops plugins:remove
```

## `service-management-ops plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ service-management-ops plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ service-management-ops plugins:unlink
  $ service-management-ops plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/uninstall.ts)_

## `service-management-ops plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ service-management-ops plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ service-management-ops plugins:unlink
  $ service-management-ops plugins:remove
```

## `service-management-ops plugins:update`

Update installed plugins.

```
USAGE
  $ service-management-ops plugins:update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/update.ts)_

## `service-management-ops profiles:delete FISCALCODE`

Delete a profile

```
USAGE
  $ service-management-ops profiles:delete FISCALCODE [-a] [-p] [-m] [-n] [-s]

FLAGS
  -a, --all           delete items in all containers
  -m, --message       delete items in message container
  -n, --notification  delete items in notification container
  -p, --profile       delete items in profile container
  -s, --service       delete items in service container

DESCRIPTION
  Delete a profile
```

_See code: [src/commands/profiles/delete.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/profiles/delete.ts)_

## `service-management-ops profiles:exist`

Returns the input CSV with a new column that is true if a profile for that fiscal code exists.

```
USAGE
  $ service-management-ops profiles:exist [-i <value>] [-p <value>]

FLAGS
  -i, --input=<value>     Input file (CSV, with the CF as first column) - defaults to stdin
  -p, --parallel=<value>  [default: 1] Number of parallel workers to run

DESCRIPTION
  Returns the input CSV with a new column that is true if a profile for that fiscal code exists.
```

_See code: [src/commands/profiles/exist.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/profiles/exist.ts)_

## `service-management-ops profiles:list`

Lists all profiles

```
USAGE
  $ service-management-ops profiles:list

DESCRIPTION
  Lists all profiles
```

_See code: [src/commands/profiles/list.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/profiles/list.ts)_

## `service-management-ops selfcare:addDelegate`

Add delegate on Selfcare

```
USAGE
  $ service-management-ops selfcare:addDelegate -i <value> -p <value> -e <value> -n <value> -s <value> -t <value>

FLAGS
  -e, --email=<value>               (required) Selfcare delegate's email
  -i, --institutionTaxCode=<value>  (required) Selfcare institutionTaxCode
  -n, --name=<value>                (required) Selfcare delegate's name
  -p, --productId=<value>           (required) Selfcare productId
  -s, --surname=<value>             (required) Selfcare delegate's surname
  -t, --taxCode=<value>             (required) Selfcare delegate's taxCode

DESCRIPTION
  Add delegate on Selfcare

EXAMPLES
  $ service-management-ops selfcare:add-delegate '{}'
```

_See code: [src/commands/selfcare/addDelegate.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/selfcare/addDelegate.ts)_

## `service-management-ops selfcare:manualOnboarding BODY`

Execute Manual Onboarding on Selfcare

```
USAGE
  $ service-management-ops selfcare:manualOnboarding BODY

ARGUMENTS
  BODY  Selfcare manual onboarding body

DESCRIPTION
  Execute Manual Onboarding on Selfcare

EXAMPLES
  $ service-management-ops selfcare:manual-onboarding-by-body '{}'
```

_See code: [src/commands/selfcare/manualOnboarding.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/selfcare/manualOnboarding.ts)_

## `service-management-ops services:check`

```
USAGE
  $ service-management-ops services:check
```

_See code: [src/commands/services/check.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/services/check.ts)_

## `service-management-ops services:details`

Retrieve service info and metadata from a given service ID

```
USAGE
  $ service-management-ops services:details [-i <value>]

FLAGS
  -i, --serviceId=<value>  The service ID

DESCRIPTION
  Retrieve service info and metadata from a given service ID
```

_See code: [src/commands/services/details.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/services/details.ts)_

## `service-management-ops services:list`

List all services in csv format

```
USAGE
  $ service-management-ops services:list

DESCRIPTION
  List all services in csv format
```

_See code: [src/commands/services/list.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/services/list.ts)_

## `service-management-ops subscriptions:list-delete DELETEFILEPATH [DELAYONDELETE] [OWNEREMAIL]`

Migrate metadata or logos from github

```
USAGE
  $ service-management-ops subscriptions:list-delete DELETEFILEPATH [DELAYONDELETE] [OWNEREMAIL]

ARGUMENTS
  DELETEFILEPATH  CSV Input file containing subscription list
  DELAYONDELETE   [default: 500] The delay between delete's operations
  OWNEREMAIL      Email of the subscriptions owner

DESCRIPTION
  Migrate metadata or logos from github

EXAMPLES
  $ service-management-ops subscriptions:list-delete -inputListPath=/tmp/input.csv
```

_See code: [src/commands/subscriptions/list-delete.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/subscriptions/list-delete.ts)_

## `service-management-ops users:create`

Create a new user with a random password in the Active Directory Azure B2C, then create a corresponding user on the API management resource.

```
USAGE
  $ service-management-ops users:create --payload <value>

FLAGS
  --payload=<value>  (required) JSON string rapresentation of a user

DESCRIPTION
  Create a new user with a random password in the Active Directory Azure B2C, then create a corresponding user on the
  API management resource.

EXAMPLES
  $ service-management-ops api-service:create  --json='{ "email": "foobar@example.com","first_name": "string","last_name": "string"}'
```

_See code: [src/commands/users/create.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/users/create.ts)_

## `service-management-ops users:get EMAIL`

Gets the user information, that is the complete list of subscription and the complete list of groups for the User identified by the provided email

```
USAGE
  $ service-management-ops users:get EMAIL

ARGUMENTS
  EMAIL  email

DESCRIPTION
  Gets the user information, that is the complete list of subscription and the complete list of groups for the User
  identified by the provided email

EXAMPLES
  $ service-management-ops users:get example@example.it
```

_See code: [src/commands/users/get.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/users/get.ts)_

## `service-management-ops users:get-all`

Get users max 100 per call use cursor for iterating

```
USAGE
  $ service-management-ops users:get-all [--cursor <value>]

FLAGS
  --cursor=<value>  Items to skip

DESCRIPTION
  Get users max 100 per call use cursor for iterating

EXAMPLES
  $ service-management-ops users:get-all

  $ service-management-ops users:get-all --cursor=100
```

_See code: [src/commands/users/get-all.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/users/get-all.ts)_

## `service-management-ops users:subscription EMAIL SUBSCRIPTIONID`

Create a Subscription identified by the provided subscription id for the User identified by the provided email

```
USAGE
  $ service-management-ops users:subscription EMAIL SUBSCRIPTIONID --product_name <value>

ARGUMENTS
  EMAIL           email
  SUBSCRIPTIONID  The id of the Subscription

FLAGS
  --product_name=<value>  (required) The name of the product

DESCRIPTION
  Create a Subscription identified by the provided subscription id for the User identified by the provided email

EXAMPLES
  $ service-management-ops users:subscription  example@example.com SUBSCRIPTIONID --product_name=PRODUCTNAME
```

_See code: [src/commands/users/subscription.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/users/subscription.ts)_

## `service-management-ops users:update-groups EMAIL`

Update the list of groups (permissions) associated to the User identified by the provided email

```
USAGE
  $ service-management-ops users:update-groups EMAIL --groups <value>

ARGUMENTS
  EMAIL  email

FLAGS
  --groups=<value>  (required) A comma separeted list of groups

DESCRIPTION
  Update the list of groups (permissions) associated to the User identified by the provided email

EXAMPLES
  $ service-management-ops users:update-groups  --groups=ApiInfoRead,ApiLimitedMessageWrite,ApiMessageRead
```

_See code: [src/commands/users/update-groups.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/users/update-groups.ts)_

## `service-management-ops users:update_user_token_name EMAIL TOKENNAMEVALUE`

Update the Token Name attribute associated to the User identified by the provided email

```
USAGE
  $ service-management-ops users:update_user_token_name EMAIL TOKENNAMEVALUE

ARGUMENTS
  EMAIL           email
  TOKENNAMEVALUE  tokenNameValue

DESCRIPTION
  Update the Token Name attribute associated to the User identified by the provided email

EXAMPLES
  $ service-management-ops users:update-token-name
```

_See code: [src/commands/users/update_user_token_name.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/users/update_user_token_name.ts)_

## `service-management-ops users:write-messages EMAIL ACTION`

Update the list of groups (permissions) associated to the User identified by the provided email

```
USAGE
  $ service-management-ops users:write-messages EMAIL ACTION

ARGUMENTS
  EMAIL   email
  ACTION  action

DESCRIPTION
  Update the list of groups (permissions) associated to the User identified by the provided email

EXAMPLES
  $ service-management-ops users:write-messages example@example.it enable
```

_See code: [src/commands/users/write-messages.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/users/write-messages.ts)_

## `service-management-ops users:write-services EMAIL ACTION`

Update the list of groups (permissions) associated to the User identified by the provided email

```
USAGE
  $ service-management-ops users:write-services EMAIL ACTION

ARGUMENTS
  EMAIL   email
  ACTION  action

DESCRIPTION
  Update the list of groups (permissions) associated to the User identified by the provided email

EXAMPLES
  $ service-management-ops users:write-services example@example.it enable
```

_See code: [src/commands/users/write-services.ts](https://github.com/pagopa/service-management-ops/blob/v1.0.0/src/commands/users/write-services.ts)_
<!-- commandsstop -->

```

```
