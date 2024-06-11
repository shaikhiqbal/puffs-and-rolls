import React, { Fragment, useEffect } from "react";
import { Check, X } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

const CustomLabel = ({ htmlFor }) => {
  return (
    <Label className="form-check-label" htmlFor={htmlFor}>
      <span className="switch-icon-left">
        <Check size={14} />
      </span>
      <span className="switch-icon-right">
        <X size={14} />
      </span>
    </Label>
  );
};

const ModalForm = (props) => {
  const { isOpen, toggle, editRow } = props;
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    reset(editRow);
  }, [reset, editRow]);

  return (
    <Modal isOpen={isOpen} className={"modal-lg modal-dialog-centered"}>
      <ModalHeader toggle={() => toggle()}></ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="nameMulti">
                Company Name
              </Label>
              <Controller
                control={control}
                name="companyName"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <Input
                      {...field}
                      type="text"
                      invalid={!!fieldState?.error}
                      id="nameMulti"
                      placeholder="First Name"
                    />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState?.error.message}
                      </small>
                    )}
                  </Fragment>
                )}
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="lastNameMulti">
                Vendor Supply Type
              </Label>
              <Controller
                control={control}
                name="vendorSupplyType"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <Input
                      {...field}
                      type="text"
                      invalid={!!fieldState?.error}
                      id="lastNameMulti"
                      placeholder="Last Name"
                    />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState?.error.message}
                      </small>
                    )}
                  </Fragment>
                )}
              />
            </Col>
            {/* <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="cityMulti"></Label>
              <Controller
                control={control}
                name="supplySubType"
                render={({ field, fieldState }) => (
                  <Fragment>
                    <Input
                      {...field}
                      type="text"
                      invalid={!!fieldState?.error}
                      id="cityMulti"
                      placeholder="City"
                    />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState?.error.message}
                      </small>
                    )}
                  </Fragment>
                )}
              />
            </Col> */}
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="CountryMulti">
                Contact Person Name
              </Label>
              <Controller
                control={control}
                name="contactPersonName"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <Input
                      {...field}
                      type="text"
                      invalid={!!fieldState?.error}
                      id="CountryMulti"
                      placeholder="Country"
                    />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState?.error.message}
                      </small>
                    )}
                  </Fragment>
                )}
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="EmailMulti">
                Email
              </Label>
              <Controller
                control={control}
                name="email"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <Input
                      {...field}
                      type="email"
                      invalid={!!fieldState?.error}
                      id="EmailMulti"
                      placeholder="Email"
                    />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState?.error.message}
                      </small>
                    )}
                  </Fragment>
                )}
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="CompanyMulti">
                Is GST Applicable
              </Label>
              <Controller
                control={control}
                name="vendorFSSAINo"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <div className="form-switch form-check-primary">
                      <Input
                        {...field}
                        type="switch"
                        id="icon-primary"
                        name="icon-primary"
                      />
                      <CustomLabel htmlFor="icon-primary" />
                    </div>
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState?.error.message}
                      </small>
                    )}
                  </Fragment>
                )}
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="CompanyMulti">
                Company
              </Label>
              <Controller
                control={control}
                name="vendorFSSAINo"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <Input
                      {...field}
                      type="text"
                      invalid={!!fieldState?.error}
                      id="CompanyMulti"
                      placeholder="Company"
                    />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState?.error.message}
                      </small>
                    )}
                  </Fragment>
                )}
              />
            </Col>
            <Col sm="12">
              <div className="d-flex">
                <Button
                  className="me-1"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
                <Button outline color="secondary" type="reset">
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ModalForm;
