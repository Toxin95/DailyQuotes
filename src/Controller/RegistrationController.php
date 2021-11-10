<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
    /**
     * @Route("/register", name="app_register")
     */
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasherInterface): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // encode the plain password
            $user->setPassword(
            $userPasswordHasherInterface->hashPassword(
                    $user,
                    $form->get('plainPassword')->getData()
                )
            );

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();
            // do anything else you need here, like send an email

            return $this->redirectToRoute('index');
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form->createView(),
        ]);
    }

    /**
 * @Route("api/register", name="api_register")
 */
public function SetUser(Request $request, EntityManagerInterface $em, ValidatorInterface $validator)
{

    $email = $request->request->get('email');
    $password = $request->request->get('password');
    var_dump($request->request);
    die;
    $user = new User();
    $user->setEmail($request->request->get('email'));
    $user->setPassword($request->request->get('password'));
    // if you want to pass the SignUp class to Validator use
    // $errors = $validator->validate($signUp);
    // but you need to customize the errors to return below, dump($errors); for more info
    $emailError = $validator->validateProperty($signUp, 'email');
    $passwordError = $validator->validateProperty($signUp, 'password');
    $formErrors = [];
    if(count($emailError) > 0) {
        $formErrors['emailError'] = $emailError[0]->getMessage();
    }
    if(count($passwordError) > 0) {
        $formErrors['passwordError'] = $passwordError[0]->getMessage();
    }
    if($formErrors) {
        return new JsonResponse($formErrors);
    }
    $user = new User();
    $user->setEmail($signUp->getEmail());
    $user->setPassword($signUp->getPassword());
    $em->persist($user);
    $em->flush();
    return new JsonResponse([
        'success_message' => 'Thank you for registering'
    ]);
}
}
