---
title: Terroform Provider for SIGNL4
parent: Samples
---

# Terraform Provider for SIGNL4

This article describes how to create a Terraform provider for SIGNL4.

[Terraform](https://developer.hashicorp.com/terraform) is an infrastructure as code tool for safely and efficiently building, changing, and versioning infrastructure—from low-level components like compute and networking to high-level features like DNS and SaaS.

## Category Example

In this example we create a Terraform provider for SIGNL4 that supports:
- Creating a category (via POST)
- Deleting a category (via DELETE)

You can create any additional resource configuration you need by referring to the [SIGNL4 REST API](https://connect.signl4.com/api/docs/index.html?urls.primaryName=SIGNL4%20API%20V2).

You'll need to implement a custom Terraform provider using the Terraform Plugin Framework (Go SDK).

## Project

The Terraform project looks like follows.

📦 Project Structure
```go
terraform-provider-signl4/
├── main.go
├── go.mod
└── internal/
    └── provider/
        └── category_resource.go

```

🔧 main.go

```go
package main

import (
	"github.com/hashicorp/terraform-plugin-framework/providerserver"
	"terraform-provider-signl4/internal/provider"
)

func main() {
	providerserver.Serve("signl4", provider.New, providerserver.ServeOpts{
		Address: "registry.terraform.io/example/signl4",
	})
}
```

📁  internal/provider/category_resource.go
```go
package provider

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/hashicorp/terraform-plugin-framework/datasource"
	"github.com/hashicorp/terraform-plugin-framework/provider"
	"github.com/hashicorp/terraform-plugin-framework/resource"
	"github.com/hashicorp/terraform-plugin-framework/types"
)

type signl4Provider struct{}

func New() provider.Provider {
	return &signl4Provider{}
}

func (p *signl4Provider) Metadata(_ context.Context, _ provider.MetadataRequest, resp *provider.MetadataResponse) {
	resp.TypeName = "signl4"
}

func (p *signl4Provider) Schema(_ context.Context, _ provider.SchemaRequest, resp *provider.SchemaResponse) {
	// No global provider schema needed
}

func (p *signl4Provider) Resources(_ context.Context) []func() resource.Resource {
	return []func() resource.Resource{
		NewCategoryResource,
	}
}

func (p *signl4Provider) DataSources(_ context.Context) []func() datasource.DataSource {
	return nil
}
```

🔨 Category Resource
```go
type categoryResource struct{}

func NewCategoryResource() resource.Resource {
	return &categoryResource{}
}

type categoryModel struct {
	ID            types.String `tfsdk:"id"`
	TeamID        types.String `tfsdk:"team_id"`
	APIKey        types.String `tfsdk:"api_key"`
	Name          types.String `tfsdk:"name"`
	Color         types.String `tfsdk:"color"`
	ImageName     types.String `tfsdk:"image_name"`
	Keywords      types.List   `tfsdk:"keywords"`
	KeywordMatch  types.String `tfsdk:"keyword_matching"`
}

func (r *categoryResource) Metadata(_ context.Context, req resource.MetadataRequest, resp *resource.MetadataResponse) {
	resp.TypeName = "signl4_category"
}

func (r *categoryResource) Schema(_ context.Context, _ resource.SchemaRequest, resp *resource.SchemaResponse) {
	resp.Schema = map[string]types.Attribute{
		"id":               types.StringType,
		"team_id":          types.StringType,
		"api_key":          types.StringType,
		"name":             types.StringType,
		"color":            types.StringType,
		"image_name":       types.StringType,
		"keywords":         types.ListType{ElemType: types.StringType},
		"keyword_matching": types.StringType,
	}
}

func (r *categoryResource) Create(ctx context.Context, req resource.CreateRequest, resp *resource.CreateResponse) {
	var plan categoryModel
	diags := req.Plan.Get(ctx, &plan)
	resp.Diagnostics.Append(diags...)
	if resp.Diagnostics.HasError() {
		return
	}

	url := fmt.Sprintf("https://connect.signl4.com/api/v2/categories/%s", plan.TeamID.ValueString())

	payload := map[string]interface{}{
		"name":             plan.Name.ValueString(),
		"color":            plan.Color.ValueString(),
		"imageName":        plan.ImageName.ValueString(),
		"keywordMatching":  plan.KeywordMatch.ValueString(),
		"keywords":         plan.Keywords.Elements(),
		"augmentations": []map[string]interface{}{
			{"enabled": false, "name": "", "type": "Subject", "value": ""},
			{"enabled": false, "name": "", "type": "Location", "value": ""},
			{"enabled": false, "name": "", "type": "Text", "value": ""},
		},
	}

	body, _ := json.Marshal(payload)
	reqBody := strings.NewReader(string(body))

	request, _ := http.NewRequest("POST", url, reqBody)
	request.Header.Set("X-S4-Api-Key", plan.APIKey.ValueString())
	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Accept", "application/json")

	client := &http.Client{}
	res, err := client.Do(request)
	if err != nil {
		resp.Diagnostics.AddError("Error creating category", err.Error())
		return
	}
	defer res.Body.Close()

	// You should parse response for actual ID, here assumed manually
	plan.ID = types.StringValue("generated-or-returned-category-id")

	diags = resp.State.Set(ctx, plan)
	resp.Diagnostics.Append(diags...)
}

func (r *categoryResource) Delete(ctx context.Context, req resource.DeleteRequest, resp *resource.DeleteResponse) {
	var state categoryModel
	req.State.Get(ctx, &state)

	url := fmt.Sprintf("https://connect.signl4.com/api/v2/categories/%s/%s", state.TeamID.ValueString(), state.ID.ValueString())

	request, _ := http.NewRequest("DELETE", url, nil)
	request.Header.Set("X-S4-Api-Key", state.APIKey.ValueString())

	client := &http.Client{}
	_, err := client.Do(request)
	if err != nil {
		resp.Diagnostics.AddError("Error deleting category", err.Error())
		return
	}
}
```

🧪 Example Terraform Usage
```hcl
provider "signl4" {}

resource "signl4_category" "my_category" {
  team_id          = "{SIGNL4-TEAM-ID}"
  api_key          = "{SIGNL4-API-Key}"
  name             = "MyCategory"
  color            = "#30AFE5"
  image_name       = "bug.svg"
  keyword_matching = "Any"
  keywords         = ["keyword1", "keyword2"]
}
```

## Instructions to Build and Use

### Prerequisites

- Go 1.21+
- Terraform CLI installed

### Build the Provider

You can build the profider using the following commands.

```bash
cd terraform-provider-signl4
go mod tidy
go build -o terraform-provider-signl4
```

Move the binary to your Terraform plugin directory:

```bash
mkdir -p ~/.terraform.d/plugins/registry.terraform.io/example/signl4/1.0.0/linux_amd64
mv terraform-provider-signl4 ~/.terraform.d/plugins/registry.terraform.io/example/signl4/1.0.0/linux_amd64/
```

Replace linux_amd64 with darwin_amd64 or windows_amd64 depending on your system.

### Create Example Terraform Config

Create a file called main.tf:

```hcl
terraform {
  required_providers {
    signl4 = {
      source  = "registry.terraform.io/example/signl4"
      version = "1.0.0"
    }
  }
}

provider "signl4" {}

resource "signl4_category" "example" {
  team_id          = "{SIGNL4-TEAM-ID}"
  api_key          = "{SIGNL4-API-Key}"
  name             = "MyCategory"
  color            = "#30AFE5"
  image_name       = "bug.svg"
  keyword_matching = "Any"
  keywords         = ["keyword1", "keyword2"]
}
```

### Initialize and Apply

```bash
terraform init
terraform apply
```

Terraform will create the SIGNL4 category via API. You can also run terraform destroy to trigger the DELETE.
